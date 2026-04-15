export function buildPrompt(context: string, question: string) {
    return `
  You're an assistant specialized in answer questions based in the given context.
  
  Context:
  ${context}
  
  Question:
  ${question}
  
  Instructions:
  - Use only the given context
  - In case you don't know the answer, please say it clearly 
  - Be objective
  
  Rules:
  - Only use the context
  - If unsure, say you don't know
  - Be concise
  `;
}