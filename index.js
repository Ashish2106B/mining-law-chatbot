require("dotenv").config();

const readline = require("readline");

const handleCommand = require("./src/commands");
const loadDocuments = require("./src/documentLoader");
const chunkDocuments = require("./src/chunkdocuments");
const indexDocuments = require("./src/indexDocuments");
const searchDocuments = require("./src/searchDocuments");
const generateAnswer = require("./src/chatbot");

console.log("==========================================");
console.log("  MINING ACTS, RULES & REGULATIONS CHATBOT");
console.log("==========================================");

console.log("\nWelcome to the Mining Law Chatbot!");
console.log("Ask questions related to mining Acts, Rules, and Regulations.");
console.log("Type 'help' to see available commands.");
console.log("Type 'exit' to quit.\n");


// Load documents
const documents = loadDocuments();

console.log(`Loaded ${documents.length} documents.`);


// Create document chunks
const chunks = chunkDocuments(documents);

console.log(`Created ${chunks.length} document chunks.`);


// Start chatbot
async function start() {

    console.log("\nCreating document embeddings...\n");

    // Create embeddings for all document chunks
    await indexDocuments(chunks);

    console.log("\nDocument indexing completed.\n");


    // Create terminal interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    // Ask user questions
    function askQuestion() {

        rl.question("You: ", async (input) => {

            input = input.trim();


            // Check special commands
            const isCommand = handleCommand(input.toLowerCase());

            if (isCommand) {
                askQuestion();
                return;
            }


            try {

                // Search relevant document chunks
                const results = await searchDocuments(
                    input,
                    chunks
                );


                if (results.length === 0) {

                    console.log("\nNo relevant information found.\n");

                } else {

                    console.log("\nGenerating answer...\n");


                    // Generate answer using Gemini
                    const answer = await generateAnswer(
                        input,
                        results
                    );


                    console.log("Bot:", answer);
                    console.log();
                }

            } catch (error) {

                console.log("\nError:", error.message);
                console.log();
            }


            // Ask next question
            askQuestion();
        });
    }


    askQuestion();
}


// Run application
start();