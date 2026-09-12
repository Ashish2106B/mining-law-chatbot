const fs = require("fs");
const path = require("path");

function loadDocuments() {
    const dataPath = path.join(__dirname, "../data");

    const documents = [];

    const categories = fs.readdirSync(dataPath);

    for (const category of categories) {

        const categoryPath = path.join(dataPath, category);

        if (!fs.statSync(categoryPath).isDirectory()) {
            continue;
        }

        const files = fs.readdirSync(categoryPath);

        for (const file of files) {

            if (!file.endsWith(".txt")) {
                continue;
            }

            const filePath = path.join(categoryPath, file);

            const content = fs.readFileSync(
                filePath,
                "utf-8"
            );

            documents.push({
                category: category,
                name: file,
                content: content
            });
        }
    }

    return documents;
}

module.exports = loadDocuments;