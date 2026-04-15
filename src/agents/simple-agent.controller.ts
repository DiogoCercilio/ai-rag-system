import { Controller, Post, Body } from "@nestjs/common";
import { AgentService } from "./simple-agent.service";

@Controller("agent")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async run(@Body("question") question: string) {
    return this.agentService.run(question);
  }
}