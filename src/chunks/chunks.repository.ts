import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChunkEntity } from "./chunk.entity";

@Injectable()
export class ChunksRepository {
  constructor(
    @InjectRepository(ChunkEntity)
    private readonly chunkRepository: Repository<ChunkEntity>,
  ) {}

  async create(payload: { document_id: string; content: string; embedding: number[] }): Promise<void> {
    await this.chunkRepository.insert({
      id: randomUUID(),
      document_id: payload.document_id,
      content: payload.content,
      embedding: payload.embedding,
    });
  }

  async search(embedding: number[], limit: number = 5) {
    const THRESHOLD = 21.86
    const result = await this.chunkRepository
      .createQueryBuilder("c")
      .innerJoin("c.document", "d")
      .select("c.content", "content")
      .addSelect("d.title", "title")
      .addSelect("c.embedding <-> CAST(:embedding AS vector)", "distance")
      .orderBy("c.embedding <-> CAST(:embedding AS vector)", "ASC")
      .setParameter("embedding", `[${embedding.join(",")}]`)
      .limit(limit)
      .getRawMany();

      return result.filter(r => r.distance < THRESHOLD)
  }
}