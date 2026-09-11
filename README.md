# Mining Acts, Rules & Regulations Chatbot

A terminal-based chatbot project for answering queries related to Acts, Rules, Regulations, and other legal documents applicable to the mining industry.

## Problem Statement

**Chatbot to respond to text queries pertaining to various Acts, Rules, and Regulations applicable to Mining industries.**

The proposed system will help mining-industry stakeholders find relevant information from legal and regulatory documents through a simple conversational interface.

---

## Current Objective

The current version focuses on building the **document retrieval system** of the chatbot.

Implemented features include:

* Terminal-based user interface
* User query input
* Special command handling
* Loading mining-related documents from local files
* Keyword-based document search
* Relevance scoring
* Ranking documents according to relevance
* Displaying relevant documents to the user

AI-based answer generation using Gemini will be implemented in a later stage.

---

## Project Structure

```text
mining-chatbot/
│
├── index.js
├── package.json
├── .env
├── .gitignore
├── README.md
│
├── src/
│   ├── chatbot.js
│   ├── documentLoader.js
│   ├── searchDocuments.js
│   └── commands.js
│
└── data/
    ├── acts/
    │   ├── coal_mines_act.txt
    │   └── explosives_act.txt
    │
    ├── rules/
    │   ├── colliery_control_rules.txt
    │   └── payment_of_wages_rules.txt
    │
    ├── regulations/
    │   └── coal_mines_regulations.txt
    │
    ├── dgms_circulars/
    │   └── circular_1.txt
    │
    └── land_laws/
        ├── cba.txt
        ├── land_acquisition.txt
        └── rehabilitation_resettlement.txt
```

---

## File Responsibilities

### `index.js`

Acts as the main entry point of the application.

It:

* Starts the terminal application
* Displays the welcome message
* Loads documents
* Accepts user queries
* Checks for special commands
* Sends normal queries to the search system
* Displays search results

---

### `commands.js`

Handles special terminal commands.

Currently supported commands:

```text
help
clear
exit
```

---

### `documentLoader.js`

Responsible for loading the legal documents stored inside the `data/` directory.

It:

1. Finds the document categories.
2. Reads `.txt` files.
3. Reads their contents.
4. Stores each document with its category, filename, and content.
5. Returns all loaded documents to the application.

Each document is represented approximately as:

```js
{
    category: "acts",
    name: "coal_mines_act.txt",
    content: "..."
}
```

---

### `searchDocuments.js`

Responsible for searching the loaded documents.

The search process currently:

1. Receives the user's query.
2. Removes common stop words.
3. Extracts useful keywords.
4. Searches for those keywords inside document content.
5. Searches document filenames for matching keywords.
6. Assigns a **relevance score** to each matching document.
7. Sorts documents according to their score.
8. Returns the most relevant documents.

For example, if the user asks:

```text
What are the safety requirements in coal mines?
```

The system identifies relevant keywords such as:

```text
safety
requirements
coal
mines
```

Documents containing more matching keywords receive higher scores and are ranked higher.

---

### `chatbot.js`

Reserved for the future AI response-generation layer.

Gemini integration will be added here later.

---

## Current Architecture

```text
User Question
      ↓
Query Processing
      ↓
Keyword Extraction
      ↓
Search Documents
      ↓
Calculate Relevance Score
      ↓
Rank Documents
      ↓
Display Relevant Documents
      ↓
Wait for Next Question
```

---

## Technologies Used

* **Node.js**
* **JavaScript**
* **readline** — terminal input/output
* **fs** — reading local files
* **path** — handling file and directory paths

---

## How to Run

Clone or open the project directory and install the required dependencies.

Then run:

```bash
node index.js
```

The chatbot will start in the terminal.

---

## Example

```text
==========================================
  MINING ACTS, RULES & REGULATIONS CHATBOT
==========================================

Welcome to the Mining Law Chatbot!
Ask questions related to mining Acts, Rules, and Regulations.
Type 'help' to see available commands.
Type 'exit' to quit.

Loaded 10 documents.

You: coal mines safety

Relevant documents:
- coal_mines_act.txt (acts)
- coal_mines_regulations.txt (regulations)
```

The documents are ranked according to their relevance score.

---

## Current Limitations

The current version is a **document retrieval system**, not yet a complete AI chatbot.

Currently:

* Search is keyword-based.
* The system displays relevant documents rather than generating natural-language answers.
* Relevant sections/text are not yet extracted separately.
* Gemini AI has not yet been integrated.
* Source citations are not yet implemented.
* The sample `.txt` documents are currently being used as the local knowledge base.

---

## Development Status

| Feature                          | Status |
| -------------------------------- | ------ |
| Terminal Interface               | ✅      |
| User Input                       | ✅      |
| Command Handling                 | ✅      |
| Document Loading                 | ✅      |
| Keyword Search                   | ✅      |
| Relevance Scoring                | ✅      |
| Document Ranking                 | ✅      |
| Relevant Text/Section Extraction | ⏳      |
| Gemini AI Integration            | ⏳      |
| Natural-Language Answers         | ⏳      |
| Source References/Citations      | ⏳      |

---

## Planned Architecture

The final system will follow a Retrieval-Augmented Generation (RAG) approach:

```text
User Question
      ↓
Query Processing
      ↓
Document Retrieval
      ↓
Relevant Text/Sections
      ↓
Gemini AI
      ↓
Generated Answer
      ↓
Source Reference
      ↓
User
```

The legal documents will act as the **source of information**, while Gemini will be used to understand the retrieved content and generate a clear response.

---

## Future Improvements

Planned improvements include:

1. Extracting relevant sections from documents.
2. Sending retrieved legal content to Gemini.
3. Generating natural-language answers.
4. Providing document/source references.
5. Improving search accuracy.
6. Supporting larger collections of mining laws and regulations.
7. Eventually supporting more advanced document formats such as PDFs.

---

## Project Goal

The final goal is to build a reliable mining-law chatbot that can help users quickly find and understand information from relevant **Acts, Rules, Regulations, DGMS Circulars, proceedings, and land-related laws** applicable to the mining industry.
