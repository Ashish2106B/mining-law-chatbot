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
- penalties
- dates
- legal requirements
- facts not present in the retrieved information

If the retrieved information is insufficient,
say so clearly.

Structure your answer EXACTLY in this format:

Summary:
Write a short 2-3 sentence summary.

Key Points:
- Point 1
- Point 2
- Point 3

Important:
- Only include important information if it is explicitly supported by the retrieved information.
- Do not create a Sources section.
- Do not mention the retrieved documents separately.
- Keep the answer concise and easy to understand.

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