import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DocumentEntity } from "src/documents/document.entity";

@Entity({ name: "chunks" })
export class ChunkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  document_id: string;

  @Column({ type: "text" })
  content: string;

  @Column({
    type: "vector",
    transformer: {
      to(value: number[]): string {
        return `[${value.join(",")}]`;
      },
      from(value: unknown): unknown {
        return value;
      },
    },
  })
  embedding: number[];

  @ManyToOne(() => DocumentEntity, (document) => document.chunks)
  @JoinColumn({ name: "document_id" })
  document: DocumentEntity;
}
