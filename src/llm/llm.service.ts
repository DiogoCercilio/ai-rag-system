export class LLMService {
    async generateAnswer(prompt: string): Promise<string> {
    const response = await fetch(process.env.LLM_GENERATE_URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL,
        prompt,
        stream: false,
      }),
    });
  
    const data = await response.json();
    return data.response;
  }
}