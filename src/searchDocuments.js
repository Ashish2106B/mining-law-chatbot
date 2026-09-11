function searchDocuments(query, documents) {

    const stopWords = [
        "what",
        "are",
        "the",
        "is",
        "of",
        "in",
        "on",
        "for",
        "to",
        "and",
        "a",
        "an",
        "how",
        "which",
        "does",
        "do"
    ];

    const words = query
        .toLowerCase()
        .replace(/[?.,!]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.includes(word));

    const results = [];

    for (const document of documents) {

        const content = document.content.toLowerCase();

        let score = 0;

        for (const word of words) {

            if (content.includes(word)) {
                score++;
            }
        }

        if (score > 0) {

            results.push({
                document: document,
                score: score
            });
        }
    }

    results.sort((a, b) => b.score - a.score);

    return results;
}

module.exports = searchDocuments;