export function buildPrompt(context: string, question: string) {    
    return `
        Você é um especialista técnico.

        Use o contexto abaixo para responder:
        ${context}

        Pergunta:
        ${question}
        `;
}