import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestModule } from './ingest/ingest.module';
import { EmbeddingService } from './embeddings/embedding.service';
import { AskController } from './retrieval/retrieval.controller';
import { LLMService } from './llm/llm.service';
import { DocumentEntity } from './documents/document.entity';
import { ChunkEntity } from './chunks/chunk.entity';
import { RetrievalService } from './retrieval/retrieval.service';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [DocumentEntity, ChunkEntity],
      synchronize: true,
    }),
    IngestModule,
    AgentsModule
  ],
  controllers: [AskController],
  providers: [EmbeddingService, LLMService, RetrievalService],
})
export class AppModule {}
