function handleCommand(input, documents, chunks) {

    if (input === "help") {

        console.log("\nAvailable commands:");

        console.log(
            "  help   - Show available commands"
        );

        console.log(
            "  stats  - Show knowledge base statistics"
        );

        console.log(
            "  topics - Show available knowledge categories"
        );

        console.log(
            "  clear  - Clear the terminal"
        );

        console.log(
            "  exit   - Exit the chatbot\n"
        );

        return true;
    }


    if (input === "stats") {

        const categories = new Set(
            documents.map(
                document => document.category
            )
        );

        console.log(
            "\n=========================================="
        );

        console.log(
            "          KNOWLEDGE BASE STATS"
        );

        console.log(
            "=========================================="
        );

        console.log(
            `Documents : ${documents.length}`
        );

        console.log(
            `Chunks    : ${chunks.length}`
        );

        console.log(
            `Categories: ${categories.size}`
        );

        console.log(
            "==========================================\n"
        );

        return true;
    }


    if (input === "topics") {

        const categories = [
            ...new Set(
                documents.map(
                    document => document.category
                )
            )
        ];

        console.log(
            "\n=========================================="
        );

        console.log(
            "        AVAILABLE KNOWLEDGE CATEGORIES"
        );

        console.log(
            "=========================================="
        );

        categories.forEach(
            (category, index) => {

                const formattedCategory =
                    category
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, char =>
                            char.toUpperCase()
                        );

                console.log(
                    `  ${index + 1}. ${formattedCategory}`
                );
            }
        );

        console.log(
            "==========================================\n"
        );

        return true;
    }


    if (input === "clear") {

        console.clear();

        return true;
    }


    if (input === "exit") {

        console.log(
            "\nThank you for using the Mining Law Chatbot!"
        );

        process.exit(0);
    }


    return false;
}


module.exports = handleCommand;