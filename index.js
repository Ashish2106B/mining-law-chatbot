const readline = require("readline");
const handleCommand = require("./src/commands");
const loadDocuments = require("./src/documentLoader");
const searchDocuments = require("./src/searchDocuments");

console.log("==========================================");
console.log("  MINING ACTS, RULES & REGULATIONS CHATBOT");
console.log("==========================================");

console.log("\nWelcome to the Mining Law Chatbot!");
console.log("Ask questions related to mining Acts, Rules, and Regulations.");
console.log("Type 'help' to see available commands.");
console.log("Type 'exit' to quit.\n");


const documents = loadDocuments();

console.log(`Loaded ${documents.length} documents.\n`);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function askQuestion() {

    rl.question("You: ", (input) => {

        input = input.trim().toLowerCase();

        const isCommand = handleCommand(input);

        if (isCommand) {
            askQuestion();
            return;
        }


        const results = searchDocuments(input, documents);


        if (results.length === 0) {

            console.log("\nNo relevant information found.\n");

        } else {

            console.log("\nRelevant documents:");

            for (const result of results) {

                console.log(
                    `- ${result.document.name} (${result.document.category})`
                );
            }

            console.log();
        }


        askQuestion();
    });
}


askQuestion();