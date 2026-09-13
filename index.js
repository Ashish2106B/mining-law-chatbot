require("dotenv").config();

const readline = require("readline");
const chalk = require("chalk");

const handleConversation = require("./src/conversation");
const handleCommand = require("./src/commands");
const loadDocuments = require("./src/documentLoader");
const chunkDocuments = require("./src/chunkDocuments");
const searchDocuments = require("./src/searchDocuments");
const generateAnswer = require("./src/chatbot");

console.clear();

console.log(
    chalk.cyan("==========================================")
);

console.log(
    chalk.bold.cyan("     MINING LAW CHATBOT")
);

console.log(
    chalk.cyan("==========================================")
);

console.log(
    chalk.white("\nWelcome to the Mining Law Chatbot!")
);

console.log(
    chalk.gray(
        "Ask questions related to mining Acts, Rules, and Regulations."
    )
);

console.log(
    chalk.gray("Type 'help' to see available commands.")
);

console.log(
    chalk.gray("Type 'exit' to quit.\n")
);


// Load documents

const documents = loadDocuments();

console.log(
    chalk.green(`✓ Loaded ${documents.length} documents.`)
);


// Create chunks

const chunks = chunkDocuments(documents);

console.log(
    chalk.green(`✓ Created ${chunks.length} predefined chunks.`)
);

console.log(
    chalk.green("\n✓ Knowledge base ready.\n")
);


// Terminal interface

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function askQuestion() {

    rl.question(
        chalk.bold.blue("You: "),
        async (input) => {

            input = input.trim();

            // Ignore empty input

            if (!input) {
                askQuestion();
                return;
            }


            // Handle commands

            const isCommand = handleCommand(
                input.toLowerCase()
            );

            if (isCommand) {
                askQuestion();
                return;
            }

            // Handle normal conversation

            const conversationResponse = handleConversation(input);

            if (conversationResponse) {

                console.log(
                    chalk.bold.green("Bot:")
                );

                console.log(
                    chalk.white(conversationResponse)
                );

                console.log();

                askQuestion();
                return;
            }


            try {

                const results = searchDocuments(
                    input,
                    chunks
                );


                // No results

                if (results.length === 0) {

                    console.log(
                        chalk.yellow(
                            "\n⚠ No relevant information found.\n"
                        )
                    );

                } else {

                    console.log(
                        chalk.gray(
                            `\n✓ Found ${results.length} relevant information chunk(s).`
                        )
                    );

                    console.log(
                        chalk.gray(
                            "Generating answer...\n"
                        )
                    );


                    const answer = await generateAnswer(
                        input,
                        results
                    );


                    console.log(
                        chalk.bold.green("Bot:")
                    );

                    console.log(
                        chalk.white(answer)
                    );

                    console.log();
                }

            } catch (error) {

                console.log(
                    chalk.red(
                        "\n✗ Unable to generate an answer."
                    )
                );

                console.log(
                    chalk.gray(
                        "Please check your Gemini API connection.\n"
                    )
                );

            }


            askQuestion();
        }
    );
}


// Handle Ctrl+C

rl.on("SIGINT", () => {

    console.log(
        chalk.cyan(
            "\n\nThank you for using the Mining Law Chatbot!"
        )
    );

    rl.close();

    process.exit(0);
});


askQuestion();