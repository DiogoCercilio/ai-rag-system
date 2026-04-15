import { Controller, Post, Body } from "@nestjs/common";
import { Retrieval } from "./retrieval";
import { RetrievalService } from "./retrieval.service";

@Controller("ask")
export class AskController {
    constructor(private readonly retrievalService: RetrievalService) { }
    @Post()
    async ask(@Body() body: { question: string }): Promise<Retrieval> {
        return await this.retrievalService.execute(body.question)
    }
}