import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from 'src/documents/documents.repository';
import { randomUUID } from 'crypto';

import { ChunksRepository } from 'src/chunks/chunks.repository';
import { ChunkService } from 'src/chunks/chunk.service';
import { EmbeddingService } from 'src/embeddings/embedding.service';

@Injectable()
export class IngestService {
  constructor(
    private readonly chunkService: ChunkService,
    private readonly embeddingService: EmbeddingService,
    private readonly documentsRepository: DocumentsRepository,
    private readonly chunksRepository: ChunksRepository,
  ) {}

  async ingest(title: string, content: string): Promise<{ success: boolean; chunks: number }> {
    const documentId = randomUUID();
    await this.documentsRepository.create({ id: documentId, title, content });

    const chunks = await this.chunkService.chunk(content);

    for (const chunk of chunks) {
      const embedding = await this.embeddingService.generateEmbedding(chunk);


      await this.chunksRepository.create({
        document_id: documentId,
        content: chunk,
        embedding: embedding,
      });
    }

    return {
      success: true,
      chunks: chunks.length,
    };
  }
}
