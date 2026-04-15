import { Module } from "@nestjs/common";
import { SearchDocumentsTool } from "src/tools/search-document.tool";
import { AgentController } from "./simple-agent.controller";
import { AgentService } from "./simple-agent.service";
import { LLMService } from "src/llm/llm.service";
import { EmbeddingService } from "src/embeddings/embedding.service";
import { ChunkService } from "src/chunks/chunk.service";
import { ChunksRepository } from "src/chunks/chunks.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChunkEntity } from "src/chunks/chunk.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChunkEntity]),
  ],
  controllers: [AgentController],
  exports: [SearchDocumentsTool],
  providers: [
    AgentService, 
    SearchDocumentsTool, 
    LLMService, 
    EmbeddingService, 
    ChunkService, 
    ChunksRepository
  ],
})
export class AgentsModule {}