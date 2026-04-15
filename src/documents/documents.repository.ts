import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentEntity } from "./document.entity";

@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async create(payload: { id: string; title: string; content: string }): Promise<void> {
    await this.documentRepository.insert({
      id: payload.id,
      title: payload.title
    });
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    return this.documentRepository.findOne({
      where: { id },
      select: { id: true, title: true },
    });
  }
}