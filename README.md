Mining Acts, Rules & Regulations Chatbot

A terminal-based AI chatbot designed to answer questions related to Acts, Rules, Regulations, DGMS circulars, and land-related laws applicable to the mining industry.

Problem Statement

Chatbot to respond to text queries pertaining to various Acts, Rules, and Regulations applicable to Mining industries.

The proposed system aims to help mining-industry stakeholders retrieve and understand relevant information from a collection of mining-related legal and regulatory documents.

Current Objective

The current version focuses on building the core Retrieval-Augmented Generation (RAG) pipeline.

The system can now:

Run as a terminal application
Accept natural-language questions
Load mining documents from .txt files
Split documents into smaller chunks
Generate embeddings for document chunks using Gemini
Generate an embedding for the user's question
Compare question and document embeddings
Retrieve semantically relevant document chunks
Pass retrieved information to Gemini
Generate a natural-language answer
Project Structure
mining_law_chatbot/
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
│   ├── chunkDocuments.js
│   ├── embeddings.js
│   ├── indexDocuments.js
│   ├── searchDocuments.js
│   ├── similarity.js
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
File Responsibilities
index.js

The main entry point of the application.

It:

Loads environment variables.
Loads documents.
Splits documents into chunks.
Generates embeddings for the chunks.
Starts the terminal interface.
Accepts user questions.
Performs semantic search.
Sends retrieved information to Gemini.
Displays the generated answer.
commands.js

Handles special terminal commands.

Currently supported:

help
clear
exit

Example:

You: help

Displays the available commands.

documentLoader.js

Loads .txt documents from the data/ directory.

Each document is stored with:

{
    category: "...",
    name: "...",
    content: "..."
}

For example:

{
    category: "acts",
    name: "coal_mines_act.txt",
    content: "..."
}
Document Chunking
chunkDocuments.js

Large documents should not always be treated as one single piece of text.

This module divides documents into smaller sections or chunks.

The current implementation primarily splits documents based on paragraphs.

For example:

Coal Mines Act

Paragraph 1
        ↓
Chunk 1

Paragraph 2
        ↓
Chunk 2

Paragraph 3
        ↓
Chunk 3

Each chunk contains information about its original document.

Example:

{
    id: "coal_mines_act.txt-0",
    documentName: "coal_mines_act.txt",
    category: "acts",
    text: "..."
}
Gemini Embeddings
embeddings.js

This module communicates with the Gemini API to convert text into an embedding vector.

An embedding represents the semantic meaning of text numerically.

For example:

"What safety measures are required?"

and:

"Procedures for protecting workers from mining hazards..."

may have similar embeddings even though they don't contain exactly the same words.

This allows the chatbot to search based on meaning rather than simple keyword matching.

Document Indexing
indexDocuments.js

This module generates embeddings for every document chunk.

The process is:

Document Chunk
      ↓
Gemini Embedding Model
      ↓
Embedding Vector
      ↓
Stored with Chunk

Each chunk eventually contains:

{
    id: "...",
    documentName: "...",
    category: "...",
    text: "...",
    embedding: [...]
}
Semantic Search
searchDocuments.js

This is the retrieval component.

Instead of manually checking whether words such as:

mine
mines
safety
rules
act

appear in a document, the system now compares the meaning of the user's question with the meaning of document chunks.

The process is:

User Question
      ↓
Create Question Embedding
      ↓
Compare with Document Embeddings
      ↓
Calculate Similarity
      ↓
Rank Chunks
      ↓
Return Top Relevant Chunks

The current implementation returns the top 5 most similar chunks.

Similarity Calculation
similarity.js

This module calculates cosine similarity between two embedding vectors.

Conceptually:

Question Vector
       ↓
       ↕
Similarity
       ↕
       ↓
Document Vector

A higher similarity score means the two pieces of text are more semantically related.

The results are sorted from highest similarity to lowest similarity.

Gemini Answer Generation
chatbot.js

This is the AI response-generation layer.

It receives:

User Question
+
Retrieved Document Chunks

and sends them to Gemini.

Gemini is instructed to:

Use the retrieved information
Answer the user's question
Avoid inventing legal information
Say when the available information is insufficient
Give a clear and understandable response
Mention the source documents

The basic process is:

User Question
      +
Relevant Chunks
      ↓
Gemini
      ↓
Natural Language Answer
Current RAG Architecture

The current system now follows this architecture:

                 USER
                   │
                   ▼
             User Question
                   │
                   ▼
          Question Embedding
                   │
                   ▼
        Semantic Similarity Search
                   │
                   ▼
          Relevant Text Chunks
                   │
                   ▼
             Gemini 2.5 Flash
                   │
                   ▼
            Generated Answer
                   │
                   ▼
                 USER
Knowledge Base

The current demonstration knowledge base contains 9 documents.

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
Land-related Laws
cba.txt
land_acquisition.txt
rehabilitation_resettlement.txt
Important Dataset Note

The current .txt files contain synthetic demonstration content created for testing the chatbot architecture.

They are not official copies of Indian Acts, Rules, Regulations, or DGMS circulars.

They should therefore not be used as a legal source.

For the final project, these files should be replaced with verified documents obtained from appropriate official sources.

Technologies Used
Node.js
JavaScript
Gemini API
@google/genai
dotenv
readline
fs
path
Environment Variables

The Gemini API key is stored in .env.

GEMINI_API_KEY=your_api_key_here

The .env file should not be committed to GitHub.

.gitignore should contain:

node_modules/
.env
Installation

Install the required packages:

npm install @google/genai dotenv
Running the Application

Start the chatbot using:

node index.js

The application first loads and indexes the documents.

Example:

Loaded 9 documents.
Created X document chunks.

Creating document embeddings...

Document indexing completed.

You:
Example Queries

The chatbot can currently be tested with questions such as:

What are the safety requirements?
How should explosives be handled?
What is mine ventilation?
How are wages recorded?
What happens during land acquisition?
What is rehabilitation and resettlement?
Tell me about coal mines.
Current Limitations

Although the basic RAG pipeline is now working, several improvements are still required.

1. Embeddings are regenerated

Currently, embeddings are generated every time the application starts.

node index.js
     ↓
Generate embeddings again

This should eventually be changed to:

First run
Documents → Embeddings → Save

Next run
Documents → Load saved embeddings
2. Local storage instead of a vector database

The current prototype keeps embeddings in memory.

A future version can use a proper vector database or local vector index.

3. Chunking can be improved

The current chunking approach primarily uses paragraphs.

Legal documents have structures such as:

Chapter
Section
Sub-section
Rule
Clause
Schedule

Future versions should preserve this structure when creating chunks.

4. Source citations need improvement

The chatbot currently receives the source filename, but a production system should provide more precise references such as:

Source:
Coal Mines Regulations
Section 45
Page 23

where such information is available.

5. Official legal documents are required

The current demonstration data must eventually be replaced with verified legal documents.

Development Status
Feature	Status
Terminal Interface	✅
User Input	✅
Command Handling	✅
Document Loading	✅
Keyword Search	🔄 Replaced by semantic search
Manual Relevance Scoring	🔄 Replaced
Document Chunking	✅
Gemini Embeddings	✅
Question Embedding	✅
Cosine Similarity	✅
Semantic Document Retrieval	✅
Top Relevant Chunk Retrieval	✅
Gemini API Integration	✅
AI Answer Generation	✅
Source Document Information	✅

START
  ↓
Start Terminal Application
  ↓
Load Documents
  ↓
Split Documents into Chunks
  ↓
Generate Gemini Embeddings
  ↓
Index Documents
  ↓
Wait for User Question
  ↓
Generate Question Embedding
  ↓
Semantic Similarity Search
  ↓
Rank Relevant Chunks
  ↓
Send Relevant Chunks + Question to Gemini
  ↓
Generate Answer
  ↓
Display Answer
  ↓
Wait for Next Question
Future Development

The next major improvements are:

Save embeddings locally so they don't have to be regenerated every startup.
Improve document chunking to understand legal sections and clauses.
Improve retrieval by tuning the number of chunks and similarity threshold.
Add accurate source references.
Replace synthetic data with official legal documents.
Add more Acts, Rules, Regulations, DGMS circulars and land-related documents.
Add safeguards against unsupported legal answers.
Evaluate retrieval and answer accuracy using a set of predefined questions.
Project Goal

The final goal is to create a reliable mining-law chatbot capable of answering natural-language questions using a verified collection of mining-related legal and regulatory documents.

The intended final pipeline is:

Natural Language Question
          ↓
Semantic Understanding
          ↓
Semantic Retrieval
          ↓
Relevant Legal Sections
          ↓
Gemini
          ↓
Grounded Answer
          ↓
Precise Source Citation

The system should use the legal documents as the source of truth, while Gemini should primarily be responsible for understanding the retrieved information and presenting it clearly.