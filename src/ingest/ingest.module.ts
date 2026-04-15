import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestService } from './ingest.service';
import { IngestController } from './ingest.controller';
import { EmbeddingService } from 'src/embeddings/embedding.service';
import { ChunkService } from 'src/chunks/chunk.service';
import { ChunksRepository } from 'src/chunks/chunks.repository';
import { DocumentsRepository } from 'src/documents/documents.repository';
import { DocumentEntity } from 'src/documents/document.entity';
import { ChunkEntity } from 'src/chunks/chunk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity, ChunkEntity])],
  controllers: [IngestController],
  providers: [IngestService, EmbeddingService, ChunkService, ChunksRepository, DocumentsRepository],
  exports: [EmbeddingService, ChunkService, ChunksRepository, DocumentsRepository],
})
export class IngestModule {}
