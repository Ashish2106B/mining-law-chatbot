require("dotenv").config();

const readline = require("readline");
const chalk = require("chalk");

const handleCommand = require("./src/commands");
const handleConversation = require("./src/conversation");
const loadDocuments = require("./src/documentLoader");
const chunkDocuments = require("./src/chunkDocuments");
const searchDocuments = require("./src/searchDocuments");
const generateAnswer = require("./src/chatbot");


// ==========================================
// STARTUP
// ==========================================

console.clear();

console.log(
    chalk.cyan("==========================================")
);

console.log(
    chalk.bold.cyan("            MINING LAW CHATBOT")
);

console.log(
    chalk.cyan("==========================================")
);

console.log(
    chalk.bold.green("\nHello! 👋")
);

console.log(
    chalk.white(
        "Welcome to the Mining Law Chatbot."
    )
);

console.log(
    chalk.gray(
        "Ask me questions about mining Acts, Rules, Regulations,"
    )
);

console.log(
    chalk.gray(
        "DGMS Circulars, and land-related laws."
    )
);

console.log(
    chalk.gray(
        "Type 'help' to see available commands."
    )
);

console.log(
    chalk.gray(
        "Type 'exit' to quit.\n"
    )
);


// ==========================================
// LOAD KNOWLEDGE BASE
// ==========================================

const documents = loadDocuments();

console.log(
    chalk.green(
        `✓ Loaded ${documents.length} documents.`
    )
);

const chunks = chunkDocuments(documents);

console.log(
    chalk.green(
        `✓ Created ${chunks.length} predefined chunks.`
    )
);

console.log(
    chalk.green(
        "\n✓ Knowledge base ready.\n"
    )
);


// ==========================================
// TERMINAL INTERFACE
// ==========================================

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// ==========================================
// ASK QUESTION
// ==========================================

function askQuestion() {

    rl.question(
        chalk.bold.blue("You: "),
        async (input) => {

            input = input.trim();


            // ==========================================
            // EMPTY INPUT
            // ==========================================

            if (!input) {

                askQuestion();

                return;
            }


            // ==========================================
            // HANDLE COMMANDS
            // ==========================================

            const isCommand = handleCommand(
                input.toLowerCase()
            );

            if (isCommand) {

                askQuestion();

                return;
            }


            // ==========================================
            // HANDLE NORMAL CONVERSATION
            // ==========================================

            const conversationResponse =
                handleConversation(input);

            if (conversationResponse) {

                console.log(
                    chalk.bold.green("\nBot:")
                );

                console.log(
                    chalk.white(
                        conversationResponse
                    )
                );

                console.log();

                askQuestion();

                return;
            }


            // ==========================================
            // SEARCH KNOWLEDGE BASE
            // ==========================================

            try {

                const results = searchDocuments(
                    input,
                    chunks
                );


                // ==========================================
                // NO RELEVANT INFORMATION
                // ==========================================

                const MIN_RELEVANCE_SCORE = 5;

                    if (
                        results.length === 0 ||
                        results[0].score < MIN_RELEVANCE_SCORE
                    ) {

                        console.log(
                            chalk.yellow(
                                "\n⚠ No sufficiently relevant information found.\n"
                            )
                        );

                    } else {


                    // ==========================================
                    // RETRIEVAL SUCCESS
                    // ==========================================

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


                    // ==========================================
                    // GENERATE ANSWER
                    // ==========================================

                    const answer =
                        await generateAnswer(
                            input,
                            results
                        );


                    // ==========================================
                    // DISPLAY ANSWER
                    // ==========================================

                    console.log(
                        chalk.cyan(
                            "┌──────────────────────────────────────────┐"
                        )
                    );

                    console.log(
                        chalk.bold.cyan(
                            "│                  ANSWER                  │"
                        )
                    );

                    console.log(
                        chalk.cyan(
                            "└──────────────────────────────────────────┘"
                        )
                    );

                    console.log();

                    console.log(
                        chalk.white(answer)
                    );


                    // ==========================================
                    // DISPLAY SOURCES
                    // ==========================================

                    console.log();

                    console.log(
                        chalk.cyan(
                            "┌──────────────────────────────────────────┐"
                        )
                    );

                    console.log(
                        chalk.bold.cyan(
                            "│                 SOURCES                  │"
                        )
                    );

                    console.log(
                        chalk.cyan(
                            "└──────────────────────────────────────────┘"
                        )
                    );

                    console.log();


                    const uniqueSources = [
                        ...new Set(
                            results.map(
                                result =>
                                    result.chunk.documentName
                            )
                        )
                    ];


                    uniqueSources.forEach(
                        (source, index) => {

                            console.log(
                                chalk.gray(
                                    `  ${index + 1}. ${source}`
                                )
                            );

                        }
                    );


                    console.log();

                    console.log(
                        chalk.gray(
                            "────────────────────────────────────────────"
                        )
                    );

                    console.log();
                }

            } catch (error) {

                // ==========================================
                // ERROR HANDLING
                // ==========================================

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


            // ==========================================
            // ASK NEXT QUESTION
            // ==========================================

            askQuestion();
        }
    );
}


// ==========================================
// HANDLE CTRL + C
// ==========================================

rl.on("SIGINT", () => {

    console.log(
        chalk.cyan(
            "\n\nThank you for using the Mining Law Chatbot!"
        )
    );

    rl.close();

    process.exit(0);
});


// ==========================================
// START CHATBOT
// ==========================================

askQuestion();