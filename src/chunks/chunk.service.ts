import { Injectable } from "@nestjs/common";
import { ChunksRepository } from "./chunks.repository";

@Injectable()
export class ChunkService {
  constructor(private readonly chunkRepository: ChunksRepository) {}
  async chunk(text: string, chunkSize = 300, overlap = 50): Promise<string[]> {
    const words = text.split(" ");
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += chunkSize - overlap) {
      const chunk = words.slice(i, i + chunkSize).join(" ");
      chunks.push(chunk);
    }

    return chunks;
  }

  async searchSimilar(embedding: number[], limit?: number) {
    return await this.chunkRepository.search(embedding, limit);
  }
}