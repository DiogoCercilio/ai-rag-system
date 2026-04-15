import { buildPrompt as preparationPrompt } from "./preparation-prompt";
import { buildPrompt as shouldUseToolPrompt } from "./should-use-tool.prompt";
import { buildPrompt as doSearchPrompt } from "./do-search.prompt";

export const prompts = {
    PREPARATION: (context: string, question: string)=> preparationPrompt(context, question),
    SHOULD_USE_TOOL: (question: string)=> shouldUseToolPrompt(question),
    DO_SEARCH: (context: string, question: string)=> doSearchPrompt(context, question)
}