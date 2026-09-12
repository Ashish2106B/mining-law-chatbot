function handleCommand(input) {

    if (input === "help") {

        console.log("\nAvailable commands:");
        console.log("  help  - Show available commands");
        console.log("  clear - Clear the terminal");
        console.log("  exit  - Exit the chatbot\n");

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