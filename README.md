# Mining Acts, Rules & Regulations Chatbot

A terminal-based AI chatbot designed to answer natural-language queries related to Acts, Rules, Regulations, DGMS Circulars, and land-related laws applicable to the mining industry.

> **Note:** The current dataset contains synthetic/demo content created for development and testing. It is not official legal text and should not be used as legal advice.

## Problem Statement

The mining industry is governed by a large number of Acts, Rules, Regulations, DGMS Circulars, and land-related provisions. Finding relevant information from these documents manually can be time-consuming.

This project aims to provide a conversational interface where users can ask natural-language questions and receive answers based on the available mining-related documents.

## Objectives

- Provide a simple terminal-based interface for mining-law queries.
- Organize mining-related documents into meaningful topic-based chunks.
- Retrieve relevant information from the local knowledge base.
- Use Google Gemini to generate natural-language answers.
- Provide source document information with responses.
- Reduce the amount of irrelevant information passed to the AI model.
- Prevent the model from generating unsupported legal information.
- Build an architecture that can later support a larger official legal dataset.

## Current Features

### Terminal Interface

The chatbot runs directly in the terminal and allows users to ask questions interactively.

Example:

```text
You: What are the safety requirements in coal mines?

Bot: ...
Document Loading

The application automatically loads .txt files from the data directory.

Current categories:

Acts
Rules
Regulations
DGMS Circulars
Land Laws
Predefined Topic-Based Chunks

Documents are divided into meaningful predefined topics using markers such as:

[TOPIC: Worker Safety]

Workers should receive appropriate safety instructions...


[TOPIC: Mine Inspections]

Regular inspections are important...

Each topic is converted into a separate knowledge chunk.

The current development dataset contains:

9 documents
87 predefined chunks
Local Retrieval

When a user asks a question, the application searches the predefined chunks and ranks relevant information based on:

Query words
Topic names
Document names
Chunk content

The most relevant chunks are then passed to Gemini.

Gemini Answer Generation

Google Gemini generates the final response using the retrieved information.

The model is instructed to:

Use only the retrieved information.
Avoid inventing laws.
Avoid inventing sections, penalties, or dates.
State when the available information is insufficient.
Mention the source documents used.
Terminal Commands

The chatbot currently supports:

help
clear
exit
Architecture
                    TXT Documents
                         |
                         v
                documentLoader.js
                         |
                         v
                chunkDocuments.js
                         |
                         v
               Predefined Chunks
                         |
                         v
                  User Question
                         |
                         v
                searchDocuments.js
                         |
                         v
                Relevant Chunks
                         |
                         v
                   chatbot.js
                         |
                         v
                  Google Gemini
                         |
                         v
                    Final Answer
Project Structure
mining_law_chatbot/
|
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
|
├── src/
│   ├── chatbot.js
│   ├── documentLoader.js
│   ├── chunkDocuments.js
│   ├── searchDocuments.js
│   ├── conversation.js
│   └── commands.js
|
└── data/
    |
    ├── acts/
    │   ├── coal_mines_act.txt
    │   └── explosives_act.txt
    |
    ├── rules/
    │   ├── colliery_control_rules.txt
    │   └── payment_of_wages_rules.txt
    |
    ├── regulations/
    │   └── coal_mines_regulations.txt
    |
    ├── dgms_circulars/
    │   └── circular_1.txt
    |
    └── land_laws/
        ├── cba.txt
        ├── land_acquisition.txt
        └── rehabilitation_resettlement.txt
File Responsibilities
index.js

Main entry point of the application.

Responsibilities:

Load environment variables.
Load documents.
Create predefined chunks.
Start the terminal interface.
Receive user queries.
Retrieve relevant information.
Generate answers.
src/documentLoader.js

Loads .txt files from the data directory and identifies their categories based on their folder.

Example:

data/acts/coal_mines_act.txt

is loaded with:

category: acts
name: coal_mines_act.txt
src/chunkDocuments.js

Parses the [TOPIC: ...] markers in each document and converts them into structured knowledge chunks.

Example:

{
    id: "coal_mines_act.txt-7",
    documentName: "coal_mines_act.txt",
    category: "acts",
    topic: "Worker Safety",
    text: "Workers should receive appropriate safety instructions..."
}
src/searchDocuments.js

Searches the predefined knowledge chunks and ranks them according to their relevance to the user's query.

src/chatbot.js

Handles communication with Google Gemini.

It receives the user's question along with the retrieved knowledge and generates the final answer.

src/conversation.js

Handles simple conversational messages such as greetings, acknowledgements, and thanks.

src/commands.js

Handles terminal commands such as:

help
clear
exit
Knowledge Base

The current development knowledge base contains the following documents.

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
Example Topics

The knowledge base is organized into topics such as:

Coal Mine Operations
Mine Management
Worker Safety
Mine Inspections
Accident Reporting
Emergency Management
Worker Welfare
Ventilation
Gas Monitoring
Dust Control
Machinery Safety
Electrical Safety
Explosives
Blasting
Land Acquisition
Compensation
Rehabilitation
Resettlement
Livelihood Support
Example Queries
tell me about coal mines
tell me about the coal mines act
what are the rules about explosives?
what are the safety requirements?
how is land acquired?
what is rehabilitation?
Technologies Used
Node.js
JavaScript
Google Gemini API
@google/genai
dotenv
Local TXT-based knowledge base
Installation
1. Clone the repository
git clone <repository-url>
2. Navigate to the project
cd mining_law_chatbot
3. Install dependencies
npm install
4. Configure Gemini API

Create a .env file in the project root:

GEMINI_API_KEY=your_api_key_here

Do not commit the .env file to GitHub.

Running the Application

Start the chatbot using:

node index.js

Expected startup:

==========================================
  MINING ACTS, RULES & REGULATIONS CHATBOT
==========================================

Welcome to the Mining Law Chatbot!

Loaded 9 documents.
Created 87 predefined chunks.

Knowledge base ready.

You:
Why Predefined Chunks?

The current project assumes that the legal knowledge base is relatively stable and is updated infrequently.

Because of this, the project currently uses predefined topic-based chunks instead of generating embeddings for the entire dataset.

This provides:

Faster startup
Lower API usage
Simple implementation
Easy debugging
Predictable retrieval
Clear organization of legal information

For example:

Coal Mines Act
|
├── Purpose and Scope
├── Coal Mine Operations
├── Mine Management
├── Worker Safety
├── Mine Inspections
├── Accident Reporting
├── Emergency Management
├── Worker Health and Welfare
└── Worker Training

If the dataset becomes significantly larger or more dynamic in the future, semantic embeddings and a vector database can be introduced.

Safety and Reliability

The chatbot is designed to reduce unsupported answers by providing Gemini with only retrieved information.

The model is instructed not to invent:

Legal sections
Rules
Regulations
Penalties
Dates
Requirements
Other unsupported legal information

If the knowledge base does not contain enough information, the chatbot should indicate that the available documents are insufficient.

The system is currently a development prototype and should not be treated as a source of legal advice.

Current Limitations
The current dataset is synthetic/demo content.
Retrieval currently uses keyword and metadata matching.
The system does not yet provide precise legal section citations.
The system does not yet use a vector database.
The knowledge base currently uses .txt files.
Query intent and document exclusion handling are still being improved.
Legal documents have not yet been replaced with verified official sources.
Future Improvements
Knowledge Base
Replace synthetic content with verified official mining-law documents.
Add more Acts, Rules, Regulations, and DGMS documents.
Add actual legal sections and subsections.
Improve topic boundaries.
Retrieval
Improve natural-language query understanding.
Support document inclusion and exclusion.
Improve ranking of relevant chunks.
Add relevance thresholds.
Support multi-topic questions.
Introduce semantic retrieval if required.
Answer Generation
Improve source attribution.
Provide section-level references.
Improve handling of insufficient information.
Add better legal-document context.
Performance
Optimize retrieval for larger datasets.
Introduce embeddings if the dataset grows substantially.
Consider a vector database for large-scale deployment.
User Experience
Improve conversational responses.
Add better error handling.
Improve terminal formatting.
Add query history if required.
Development Roadmap
[✓] Terminal interface
        |
[✓] Command handling
        |
[✓] Document loading
        |
[✓] Initial document chunking
        |
[✓] Predefined topic-based chunks
        |
[✓] Basic retrieval
        |
[✓] Gemini answer generation
        |
[ ] Conversational query handling
        |
[ ] Query intent understanding
        |
[ ] Document inclusion/exclusion
        |
[ ] Improved relevance scoring
        |
[ ] Source/section citations
        |
[ ] Verified official legal dataset
        |
[ ] Advanced semantic retrieval
        |
[ ] Production-ready system
Environment and Security

The Gemini API key must be stored in .env:

GEMINI_API_KEY=your_api_key_here

The .gitignore file should contain:

node_modules/
.env

Never upload API keys or other credentials to GitHub.

Disclaimer

This project is an educational and development prototype.

The current knowledge base contains synthetic information and does not represent official Indian mining legislation.

Once official legal documents are integrated, all legal information should be verified against authoritative government sources before being relied upon for legal, regulatory, operational, or compliance decisions.