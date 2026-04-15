import { Injectable } from "@nestjs/common";
import { LLMService } from "src/llm/llm.service";
import { prompts } from "src/llm/prompts/prompts";
import { SearchDocumentsTool } from "src/tools/search-document.tool";

@Injectable()
export class AgentService {
    constructor(
        private readonly searchTool: SearchDocumentsTool,
        private readonly llmService: LLMService
    ) { }

    async run(question: string) {
        const decision = await this.decide(question)
        
        return {
            answer: decision.tool ? await this.searchUsingTool(decision, question) : await this.llmService.generateAnswer(question),
            usedTool: decision.tool
        };
    }

    private async decide(question: string) {
        const prompt = prompts.SHOULD_USE_TOOL(question);
        const raw = await this.llmService.generateAnswer(prompt);

        try {
            return JSON.parse(raw);
        } catch (err) {
            console.error("Error parsing LLM answer:", raw);
            return { answer: raw };
        }
    }

    private async searchUsingTool(decision, question: string) {
        const toolResult = await this.executeTool(decision.tool, decision.input);
        const context = toolResult.map(r => `[Fonte: ${r.title}]\n${r.content}`).join("\n\n");
        const prompt = prompts.DO_SEARCH(context, question)

        return {
            answer: await this.llmService.generateAnswer(prompt),
            usedTool: decision.tool,
            sources: toolResult,
        };
    }

    private async executeTool(name: string, input: any) {
        const tools = { searchDocuments: this.searchTool };
        const tool = tools[name];

        if (!tool) {
            throw new Error(`Tool not found: ${name}`);
        }
        return tool.execute(input);
    }
}