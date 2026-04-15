import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ChunkEntity } from "../chunks/chunk.entity";

@Entity({ name: "documents" })
export class DocumentEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "date", default: new Date() })
  created_at: Date

  @OneToMany(() => ChunkEntity, (chunk) => chunk.document)
  chunks: ChunkEntity[];
}
