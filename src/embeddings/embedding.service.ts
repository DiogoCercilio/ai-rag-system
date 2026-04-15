export class EmbeddingService {
  async generateEmbedding(text: string): Promise<number[]> {

    const response = await fetch(process.env.EMBEDDING_API_URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: text,
      }),
    });

    const data = await response.json();
    return data.embedding;
  }
}