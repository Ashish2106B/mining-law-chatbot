# ⛏️ Mining Acts, Rules & Regulations Chatbot

A terminal-based AI chatbot that answers natural-language queries related to mining Acts, Rules, Regulations, DGMS Circulars, and land-related laws.

The system combines a **local topic-based knowledge base**, **keyword relevance search**, and **Google Gemini** to retrieve relevant information and generate clear, structured responses.

> ⚠️ **Important:** The current `data/` files contain synthetic/demo content created for development and testing. They are not official legal documents and must not be used as legal advice or for real-world compliance decisions.

---

## 📌 Problem Statement

The mining industry is governed by a large number of Acts, Rules, Regulations, DGMS Circulars, and land-related laws.

Finding relevant information manually across multiple documents can be time-consuming for mining industry stakeholders.

This project aims to provide a simple conversational interface where users can ask natural-language questions and receive answers based on the available mining-related knowledge base.

---

## 🎯 Objectives

- Provide a simple terminal-based interface for mining-law queries.
- Organize legal information into meaningful topic-based sections.
- Retrieve relevant information using local search and relevance scoring.
- Use Google Gemini to generate natural-language answers.
- Display the source documents used for each answer.
- Reduce irrelevant information passed to the AI model.
- Prevent unsupported legal information from being generated.
- Create a foundation that can later support verified official legal documents.

---

## ✨ Features

### 💬 Interactive Terminal Chatbot

Users can interact with the chatbot directly from the terminal.

Example:

```text
You: tell me about coal mines

The chatbot retrieves relevant information and generates an answer.

📚 Local Knowledge Base

The chatbot loads .txt documents from categorized folders.

Current categories include:

Acts
Rules
Regulations
DGMS Circulars
Land Laws
🧩 Topic-Based Document Chunking

Documents are divided into predefined topics using markers such as:

[TOPIC: Worker Safety]

Workers should receive appropriate safety instructions...

[TOPIC: Mine Inspections]

Regular inspections are important...

Each topic becomes an individual knowledge chunk.

Current development dataset:

Documents: 9
Knowledge Chunks: 87
Categories: 5
🔎 Local Relevance Search

The chatbot searches the local knowledge base before calling Gemini.

The search considers:

Query words
Topic names
Document names
Document content
Strong matches for specific legal documents

The results are ranked according to a relevance score.

A minimum relevance threshold is also used to prevent weak matches from being sent to Gemini.

🤖 Google Gemini Integration

Google Gemini is used only after relevant information has been retrieved.

The model is instructed to:

Use only the retrieved information.
Avoid inventing laws.
Avoid inventing sections.
Avoid inventing penalties.
Avoid inventing dates.
Avoid inventing legal requirements.
Clearly indicate when the available information is insufficient.
📖 Structured Answers

Answers are presented in a structured format containing sections such as:

Summary:
...

Key Points:
- ...
- ...
- ...

The application separately displays the source documents.

Example:

┌──────────────────────────────────────────┐
│                  ANSWER                  │
└──────────────────────────────────────────┘

Summary:
Coal mining involves several operational and
safety requirements.

Key Points:
- Worker safety is an important part of mining.
- Regular mine inspections are required.
- Emergency procedures should be maintained.


┌──────────────────────────────────────────┐
│                 SOURCES                  │
└──────────────────────────────────────────┘

  1. coal_mines_act.txt
  2. coal_mines_regulations.txt
🖥️ Terminal Commands

The chatbot supports:

help
stats
topics
clear
exit
help

Displays available commands.

stats

Displays knowledge-base statistics.

Example:

KNOWLEDGE BASE STATS
Documents : 9
Chunks    : 87
Categories: 5
topics

Displays the available knowledge categories.

clear

Clears the terminal.

exit

Exits the chatbot.

The application also handles Ctrl + C gracefully.

💬 Basic Conversation Handling

The chatbot can handle simple conversational messages such as:

hi
hello
hey
thanks
thank you
thanku
ok
okay
got it
bye
goodbye

These messages are handled locally and do not require a Gemini API call.

🏗️ Architecture
                     User Query
                         │
                         ▼
              ┌─────────────────────┐
              │ Commands /          │
              │ Conversation Handler│
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Knowledge Base      │
              │ Search              │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Relevance Scoring   │
              │ + Threshold         │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Relevant Knowledge  │
              │ Chunks              │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Google Gemini       │
              │ 2.5 Flash           │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Structured Answer   │
              │ + Sources           │
              └─────────────────────┘
📂 Project Structure
mining_law_chatbot/
│
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
│
├── src/
│   ├── chatbot.js
│   ├── documentLoader.js
│   ├── chunkDocuments.js
│   ├── searchDocuments.js
│   ├── conversation.js
│   └── commands.js
│
└── data/
    │
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
🧠 File Responsibilities
index.js

The main entry point of the application.

Responsibilities:

Load environment variables.
Load documents.
Create knowledge chunks.
Initialize the terminal interface.
Handle user input.
Handle commands.
Handle basic conversation.
Perform document retrieval.
Generate answers.
Display sources.
src/documentLoader.js

Loads .txt files from the data/ directory.

It automatically identifies the category based on the folder containing the document.

Example:

data/acts/coal_mines_act.txt

is loaded with:

category: acts
name: coal_mines_act.txt
src/chunkDocuments.js

Processes the [TOPIC: ...] markers in each document.

Example:

[TOPIC: Worker Safety]

Workers should receive appropriate safety instructions.

becomes a structured chunk containing:

documentName
category
topic
text
src/searchDocuments.js

Searches the knowledge chunks and assigns relevance scores based on:

Topic matches
Content matches
Document-name matches
Specific document keywords

The highest-scoring results are returned for answer generation.

src/chatbot.js

Handles communication with Google Gemini.

It:

Receives the user's question.
Receives the retrieved knowledge chunks.
Builds a controlled prompt.
Sends the prompt to Gemini.
Returns the generated answer.
src/conversation.js

Handles simple conversational messages locally.

Examples:

hi
thank you
ok
bye
src/commands.js

Handles terminal commands:

help
stats
topics
clear
exit
📚 Current Knowledge Base

The current development dataset contains 9 documents.

Acts
coal_mines_act.txt
explosives_act.txt
Rules
colliery_control_rules.txt
payment_of_wages_rules.txt
Regulations
coal_mines_regulations.txt
DGMS Circulars
circular_1.txt
Land Laws
cba.txt
land_acquisition.txt
rehabilitation_resettlement.txt
🗂️ Example Topics

The knowledge base currently contains topics such as:

Coal Mine Operations
Mine Management
Worker Safety
Mine Inspections
Accident Reporting
Emergency Management
Worker Health and Welfare
Worker Training
Ventilation
Gas Monitoring
Dust Control
Ground Control
Machinery Safety
Electrical Safety
Explosives
Blasting Operations
Land Acquisition
Compensation
Rehabilitation
Resettlement
Livelihood Support
Housing
Community Facilities
💡 Example Queries

The chatbot can be tested with questions such as:

tell me about coal mines
tell me about the coal mines act
what are the safety requirements?
what are the rules regarding wages?
how are explosives handled?
what is rehabilitation?
how is land acquired?
🛠️ Technologies Used
Node.js
JavaScript
Google Gemini API
Google GenAI SDK
dotenv
Chalk
Local TXT-based knowledge base
📋 Prerequisites

Before running the project, make sure you have:

Node.js installed
npm installed
A Google Gemini API key

Check Node.js:

node --version

Check npm:

npm --version
🚀 Installation
1. Clone the repository
git clone <repository-url>
2. Navigate to the project
cd mining_law_chatbot
3. Install dependencies
npm install
🔐 Environment Variables

Create a .env file in the project root:

GEMINI_API_KEY=your_api_key_here

The API key should never be committed to GitHub.

The .gitignore file should contain:

node_modules/
.env
▶️ Running the Application

Start the chatbot using:

node index.js

The application will display:

==========================================
            MINING LAW CHATBOT
==========================================

Hello! 👋
Welcome to the Mining Law Chatbot.
Ask me questions about mining Acts, Rules, Regulations,
DGMS Circulars, and land-related laws.
Type 'help' to see available commands.
Type 'exit' to quit.

✓ Loaded 9 documents.
✓ Created 87 predefined chunks.

✓ Knowledge base ready.

You:
🔄 How the System Works
Step 1 — Load Documents

The application scans the data/ directory and loads the available .txt files.

data/
 ├── acts/
 ├── rules/
 ├── regulations/
 ├── dgms_circulars/
 └── land_laws/
Step 2 — Create Knowledge Chunks

Each document is divided into predefined topic sections.

Document
   ↓
[TOPIC: ...]
   ↓
Knowledge Chunk
Step 3 — Search

When a user asks a question, the application compares the query against the available chunks.

User Query
    ↓
Keyword Matching
    ↓
Topic Matching
    ↓
Document Matching
    ↓
Relevance Score
Step 4 — Apply Relevance Threshold

Weak results are rejected before calling Gemini.

Search Results
      ↓
Relevance Check
      ↓
 ┌────┴────┐
 │         │
Good     Weak
 │         │
 ▼         ▼
Gemini    Reject

This helps prevent unrelated questions from being answered using weakly matched information.

Step 5 — Generate Answer

Relevant chunks are passed to Gemini.

Gemini generates a concise structured response based only on the retrieved information.

Step 6 — Display Sources

The application extracts the document names from the retrieved chunks and displays them separately.

Sources:
  1. coal_mines_act.txt
  2. coal_mines_regulations.txt
🔒 Reliability Approach

The system uses a retrieval-first approach.

Instead of sending the entire knowledge base to Gemini:

Entire Dataset
      ↓
    Gemini

the application first retrieves relevant information:

User Query
     ↓
Local Search
     ↓
Relevant Chunks
     ↓
Gemini

This provides better control over the information available to the AI model.

Gemini is also explicitly instructed not to invent unsupported legal information.

⚠️ Current Limitations

The current version is a development prototype.

Dataset

The current documents are synthetic/demo documents.

They must eventually be replaced with verified official legal documents.

Retrieval

The current retrieval system is based primarily on keyword and metadata matching.

It is not a semantic vector-search system.

Legal References

The chatbot does not yet provide precise official section-level citations.

Document Formats

The current knowledge base primarily uses .txt files.

Query Understanding

Complex natural-language intent handling is still limited.

For example, document exclusion queries such as:

tell me about coal mines but not the coal mines act

are not yet handled perfectly.

🚧 Future Improvements
1. Official Legal Dataset

Replace the synthetic dataset with verified government sources.

Potential future sources include:

Mining Acts
Mining Rules
Mining Regulations
DGMS Circulars
DGMS notifications
Court/CoI proceedings where appropriate
Land acquisition laws
Compensation provisions
Rehabilitation and resettlement provisions
2. Better Retrieval

Potential improvements include:

Improved query understanding
Better relevance scoring
Query intent detection
Document inclusion/exclusion
Multi-topic retrieval
Semantic search
Embeddings
Vector databases

Embeddings and vector databases are intentionally not part of the current implementation because the current dataset is small and relatively static.

3. Better Source References

Future versions can provide:

Source:
Coal Mines Act

Section:
...

Topic:
Worker Safety

Document:
...

This would make the system more useful for compliance-oriented queries.

4. Larger Knowledge Base

The system can eventually support a significantly larger collection of:

Acts
Rules
Regulations
Circulars
Notifications
Guidelines
Orders
Land Laws
5. Improved Conversational Context

Future versions can support follow-up questions such as:

You: What are the safety requirements?

Bot: ...

You: What about worker training?

Bot: ...

where the second question can use relevant context from the previous interaction.

🧪 Testing Checklist

Before considering a build stable, test the following:

Basic Conversation
hi
hello
thanku
thank you
ok
bye
Commands
help
stats
topics
clear
exit
Mining Queries
tell me about coal mines
tell me about the coal mines act
what are the safety requirements?
what are the rules regarding wages?
how are explosives handled?
what is rehabilitation?
how is land acquired?
Irrelevant Query
what is the capital of France?

The chatbot should avoid generating a mining-law answer when the available information is not relevant.

🔑 Security

Never commit the following to GitHub:

.env
node_modules/
API keys
Passwords
Private credentials

The .gitignore file should include:

node_modules/
.env
⚖️ Disclaimer

This project is an educational and development prototype.

The current knowledge base contains synthetic information and does not represent official Indian mining legislation.

The chatbot should not be relied upon for:

Legal advice
Regulatory compliance decisions
Mining operations
Safety decisions
Legal proceedings
Government submissions

Before real-world use, all information should be replaced with and verified against authoritative official sources.

🗺️ Development Roadmap
[✓] Terminal interface
        ↓
[✓] Command handling
        ↓
[✓] Document loading
        ↓
[✓] Topic-based chunking
        ↓
[✓] Local relevance search
        ↓
[✓] Relevance threshold
        ↓
[✓] Gemini integration
        ↓
[✓] Structured responses
        ↓
[✓] Source display
        ↓
[✓] Basic conversation handling
        ↓
[✓] Knowledge-base statistics
        ↓
[✓] Knowledge categories command
        ↓
[ ] Official legal dataset
        ↓
[ ] Improved query understanding
        ↓
[ ] Section-level citations
        ↓
[ ] Advanced semantic retrieval
        ↓
[ ] Production-ready system
🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

Fork the repository.
Create a new branch.
git checkout -b feature/your-feature
Make your changes.
Test the application.
Commit your changes.
git commit -m "Add your feature"
Push the branch.
git push origin feature/your-feature
Open a Pull Request.
📄 License

This project is currently intended for educational and development purposes.

Add an appropriate open-source license such as MIT if you decide to distribute the project publicly.
