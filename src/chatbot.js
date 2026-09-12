const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateAnswer(question, results) {

    const context = results
        .map(result => {
            return `
Source: ${result.chunk.documentName}
Category: ${result.chunk.category}
Topic: ${result.chunk.topic}

Information:
${result.chunk.text}
`;
        })
        .join("\n\n");

    const prompt = `
You are a Mining Laws assistant.

Answer the user's question using ONLY the
retrieved information provided below.

Do not invent:
- laws
- sections
- rules
- penalties
- dates
- legal requirements

If the retrieved information is insufficient,
say that the available documents do not contain
sufficient information to answer the question.

Give a clear and concise answer.

At the end, provide the source documents used.

User Question:
${question}

Retrieved Information:
${context}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
}

module.exports = generateAnswer;