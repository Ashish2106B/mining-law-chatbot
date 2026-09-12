require("dotenv").config();

const readline = require("readline");

const handleCommand = require("./src/commands");
const loadDocuments = require("./src/documentLoader");
const chunkDocuments = require("./src/chunkdocuments");
const searchDocuments = require("./src/searchDocuments");
const generateAnswer = require("./src/chatbot");

console.log("==========================================");
console.log("  MINING ACTS, RULES & REGULATIONS CHATBOT");
console.log("==========================================");

console.log("\nWelcome to the Mining Law Chatbot!");
console.log(
    "Ask questions related to mining Acts, Rules, and Regulations."
);
console.log("Type 'help' to see available commands.");
console.log("Type 'exit' to quit.\n");

const documents = loadDocuments();

console.log(`Loaded ${documents.length} documents.`);

const chunks = chunkDocuments(documents);

console.log(`Created ${chunks.length} predefined chunks.`);

console.log("\nKnowledge base ready.\n");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {

    rl.question("You: ", async (input) => {

        input = input.trim();

        if (!input) {
            askQuestion();
            return;
        }

        const isCommand = handleCommand(
            input.toLowerCase()
        );

        if (isCommand) {
            askQuestion();
            return;
        }

        try {

            const results = searchDocuments(
                input,
                chunks
            );

            if (results.length === 0) {

                console.log(
                    "\nNo relevant information found.\n"
                );

            } else {

                console.log("\nRelevant information found.");
                console.log("Generating answer...\n");

                const answer = await generateAnswer(
                    input,
                    results
                );

                console.log("Bot:", answer);
                console.log();
            }

        } catch (error) {

            console.log(
                "\nError:",
                error.message
            );

            console.log();
        }

        askQuestion();
    });
}

askQuestion();