import { Injectable } from "@nestjs/common";
import { Tool } from "./tool.interface";
import { EmbeddingService } from "src/embeddings/embedding.service";
import { ChunkService } from "src/chunks/chunk.service";

@Injectable()
export class SearchDocumentsTool implements Tool<{ query: string }, any[]> {
    name = "searchDocuments";
    description =
      "Search internal documents to retrieve relevant technical information about authentication, APIs, and backend systems.";
  

    constructor(
        private readonly embeddingService: EmbeddingService,
        private readonly chunkService: ChunkService
    ) {
        this.name = "searchDocuments"
        this.description = "Search for relevant information in internal documents"
    }

    async execute({ query }) {
        const embedding = await this.embeddingService.generateEmbedding(query);
        const results = await this.chunkService.searchSimilar(embedding, 5);
        return results;
    }
}