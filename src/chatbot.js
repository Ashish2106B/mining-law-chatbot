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
Similarity Score: ${result.score.toFixed(4)}

Relevant Information:
${result.chunk.text}
`;
        })
        .join("\n\n");

    const prompt = `
You are a Mining Laws assistant.

Answer the user's question using ONLY the information
provided in the retrieved legal document sections.

The retrieved sections were selected based on semantic
similarity to the user's question.

Do not invent laws, rules, sections, penalties, dates,
or other legal information.

If the retrieved information is not sufficient to answer
the question, clearly say that the available documents
do not contain sufficient information.

If the question is broad, provide a general answer based
on the available retrieved information.

Do not assume that the user is asking about a particular
Act or Rule unless the retrieved information supports it.

At the end, mention the source document names used for
the answer.

User Question:
${question}

Retrieved Legal Information:
${context}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
}

module.exports = generateAnswer;