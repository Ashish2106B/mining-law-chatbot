function chunkDocuments(documents) {

    const chunks = [];

    for (const document of documents) {

        const sections = document.content.split(
            /\[TOPIC:\s*(.*?)\]\s*/g
        );

        for (let i = 1; i < sections.length; i += 2) {

            const topic = sections[i].trim();

            const text = sections[i + 1]
                .trim();

            if (!text) {
                continue;
            }

            chunks.push({
                id: `${document.name}-${i}`,
                documentName: document.name,
                category: document.category,
                topic: topic,
                text: text
            });
        }
    }

    return chunks;
}

module.exports = chunkDocuments;