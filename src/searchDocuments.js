function searchDocuments(query, chunks) {

    const lowerQuery = query.toLowerCase();

    const queryWords = lowerQuery
        .split(/\W+/)
        .filter(word => word.length > 2);

    const results = [];

    for (const chunk of chunks) {

        const text = chunk.text.toLowerCase();
        const topic = chunk.topic.toLowerCase();
        const document = chunk.documentName.toLowerCase();

        let score = 0;


        // ==========================================
        // MATCH TOPIC, TEXT AND DOCUMENT
        // ==========================================

        for (const word of queryWords) {

            if (topic.includes(word)) {
                score += 5;
            }

            if (text.includes(word)) {
                score += 2;
            }

            if (document.includes(word)) {
                score += 4;
            }
        }


        // ==========================================
        // STRONG DOCUMENT MATCHES
        // ==========================================

        if (
            lowerQuery.includes("coal mines act") &&
            document === "coal_mines_act.txt"
        ) {
            score += 10;
        }

        if (
            lowerQuery.includes("explosives act") &&
            document === "explosives_act.txt"
        ) {
            score += 10;
        }

        if (
            lowerQuery.includes("colliery") &&
            document === "colliery_control_rules.txt"
        ) {
            score += 10;
        }

        if (
            lowerQuery.includes("wages") &&
            document === "payment_of_wages_rules.txt"
        ) {
            score += 10;
        }

        if (
            lowerQuery.includes("regulations") &&
            document === "coal_mines_regulations.txt"
        ) {
            score += 10;
        }

        if (
            lowerQuery.includes("land acquisition") &&
            document === "land_acquisition.txt"
        ) {
            score += 10;
        }

        if (
            lowerQuery.includes("rehabilitation") ||
            lowerQuery.includes("resettlement")
        ) {

            if (
                document ===
                "rehabilitation_resettlement.txt"
            ) {
                score += 10;
            }
        }


        // ==========================================
        // STORE RELEVANT RESULTS
        // ==========================================

        if (score > 0) {

            results.push({
                chunk: chunk,
                score: score
            });
        }
    }


    // ==========================================
    // SORT BY RELEVANCE
    // ==========================================

    results.sort(
        (a, b) => b.score - a.score
    );


    // ==========================================
    // RETURN TOP RESULTS
    // ==========================================

    return results.slice(0, 5);
}


module.exports = searchDocuments;