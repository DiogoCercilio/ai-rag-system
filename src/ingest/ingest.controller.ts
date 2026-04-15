import { Controller, Post, Body } from "@nestjs/common";
import { IngestService } from "./ingest.service";

@Controller("ingest")
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}
  @Post()
  async ingest(
    @Body() body: { title: string; content: string }
  ) {    
    return await this.ingestService.ingest(body.title, body.content);
  }
}