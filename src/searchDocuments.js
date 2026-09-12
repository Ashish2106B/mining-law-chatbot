const createEmbedding = require("./embeddings");
const cosineSimilarity = require("./similarity");

async function searchDocuments(query, chunks) {

    // Create embedding for user's question
    const queryEmbedding = await createEmbedding(query);

    const results = [];

    for (const chunk of chunks) {

        const similarity = cosineSimilarity(
            queryEmbedding,
            chunk.embedding
        );

        results.push({
            chunk: chunk,
            score: similarity
        });
    }

    // Highest similarity first
    results.sort((a, b) => b.score - a.score);

    // Return top 5 results
    return results.slice(0, 5);
}

module.exports = searchDocuments;