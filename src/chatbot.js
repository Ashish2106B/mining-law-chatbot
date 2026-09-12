const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateAnswer(question, results) {

    const context = results
        .map(result => {
            return `
Source: ${result.document.name}
Category: ${result.document.category}

${result.document.content}
`;
        })
        .join("\n\n");

    const prompt = `
You are a Mining Laws assistant.

Answer the user's question using ONLY the information provided
in the legal documents below.

Do not invent laws, rules, sections, penalties, dates, or other
legal information.

If the provided documents do not contain enough information to
answer the question, clearly say that the available documents
do not contain sufficient information.

Keep the answer clear and easy to understand.

User Question:
${question}

Legal Documents:
${context}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
}

module.exports = generateAnswer;