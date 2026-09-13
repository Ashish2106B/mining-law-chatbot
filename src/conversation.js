function handleConversation(input) {

    const message = input
        .toLowerCase()
        .trim();

    if (
        message === "hi" ||
        message === "hello" ||
        message === "hey"
    ) {
        return "Hello! How can I help you with mining laws, rules, or regulations?";
    }

    if (
        message === "thanks" ||
        message === "thank you" ||
        message === "thanku" ||
        message === "thx"
    ) {
        return "You're welcome! Feel free to ask another question.";
    }

    if (
        message === "ok" ||
        message === "okay" ||
        message === "got it"
    ) {
        return "Sure. You can ask me another question whenever you're ready.";
    }

    if (
        message === "bye" ||
        message === "goodbye"
    ) {
        return "Goodbye! Thank you for using the Mining Law Chatbot.";
    }

    return null;
}

module.exports = handleConversation;