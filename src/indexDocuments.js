const createEmbedding = require("./embeddings");

async function indexDocuments(chunks) {

    for (const chunk of chunks) {

        console.log(
            `Creating embedding: ${chunk.documentName} - ${chunk.id}`
        );

        chunk.embedding = await createEmbedding(chunk.text);
    }

    return chunks;
}

module.exports = indexDocuments;