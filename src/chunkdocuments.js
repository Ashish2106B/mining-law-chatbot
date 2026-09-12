function chunkDocuments(documents) {

    const chunks = [];

    for (const document of documents) {

        const text = document.content;

        // Split roughly by paragraphs
        const paragraphs = text
            .split(/\n\s*\n/)
            .map(paragraph => paragraph.trim())
            .filter(paragraph => paragraph.length > 0);

        for (let i = 0; i < paragraphs.length; i++) {

            chunks.push({
                id: `${document.name}-${i}`,

                documentName: document.name,

                category: document.category,

                text: paragraphs[i]
            });
        }
    }

    return chunks;
}

module.exports = chunkDocuments;