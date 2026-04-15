import { Injectable } from "@nestjs/common";
import { ChunkService } from "src/chunks/chunk.service";
import { EmbeddingService } from "src/embeddings/embedding.service";
import { LLMService } from "src/llm/llm.service";
import { buildPrompt } from "src/llm/prompts/preparation-prompt";
import { Retrieval } from "./retrieval";

@Injectable()
export class RetrievalService {
    constructor(
        private readonly llmService: LLMService,
        private readonly embeddingService: EmbeddingService,
        private chunkService: ChunkService
    ) { }

    async execute(question: string): Promise<Retrieval> {
        const queryEmbedding = await this.embeddingService.generateEmbedding(question);
        const chunks = await this.chunkService.searchSimilar(queryEmbedding);
        const context = chunks.map(c => c.content).join("\n\n");
        const prompt = buildPrompt(context, question);
        const answer = await this.llmService.generateAnswer(prompt);

        return {
            answer, 
            chunks
        }
    }
}