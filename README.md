# 🤖 AI Agent with Tool Calling & Adaptive RAG (Node.js + NestJS)

An AI agent that dynamically decides whether to use Retrieval-Augmented Generation (RAG) or respond directly using an LLM.
> ⚠️ This is not a static RAG pipeline — it's a decision-making system.

## 🚀 Why This Project?

Most RAG systems always retrieve context.

This project introduces:

- Conditional retrieval (Adaptive RAG)
- Tool-based architecture
- LLM-driven decision making

## 🧪 Example: Why RAG Matters
## 1. Ingest your data... (Indexing Data)
>POST - Kukamont is a faraway, enchanted land...<br/>
>POST - More than 1 million people are currently living in Kukamont...<br/>
>POST - Kataplah is a very dangerous monster that lives in Kukamont...<br/>

## 2. Make any question...

>POST - Who's Kataplah?

```text
(AI Answer) - Kataplah does not seem to be a well-known figure, celebrity, or a character in popular culture. It is possible that it might be a misspelling, a pseudonym, or a reference to something specific. If you could provide more context about where you encountered the name \"Kataplah\", I may be able to give a more accurate response."
```

The LLM cannot answer because the information is not in its training data.
To solve this, the agent uses a retrieval tool to access external knowledge via RAG.

> [!TIP]
>POST - Who's Kataplah? If you don't know, could you check the external docs?

```json
{
  "usedTool": "searchDocuments",
  "answer": "Kataplah is a dangerous monster...",
  "sources": [...]
}
```

## About the implementation
This project implements a **tool-augmented AI agent** capable of dynamically deciding whether to:

* Use **Retrieval-Augmented Generation (RAG)** to answer based on internal data
* Or respond directly using an LLM (without retrieval)

---

## 🚀 Overview

Traditional RAG pipelines always retrieve context before answering.

This project goes a step further by implementing an **adaptive agent** that:

* Decides when retrieval is necessary
* Uses tools (functions) dynamically
* Combines semantic search with LLM reasoning

---

## 🧠 Architecture

```text
User Question
      ↓
   AI Agent (LLM)
      ↓
 ┌───────────────┐
 │ Decision Step │
 └───────────────┘
      ↓
 ┌───────────────┬────────────────┐
 │ Use Tool      │ Direct Answer  │
 │ (RAG)         │ (LLM only)     │
 └───────────────┴────────────────┘
      ↓
Final Response
```

## 🧠 Design Decisions

### Why adaptive RAG?
Always retrieving data increases latency and cost. This system uses retrieval only when necessary.

### Why tools?
Tools allow the LLM to extend its capabilities beyond text generation.

### Why not use frameworks like LangChain?
This project implements core concepts manually to better understand how agent systems work internally.

---

## 🔧 Tech Stack

* **Node.js / TypeScript**
* **NestJS**
* **PostgreSQL + pgvector**
* **Ollama (local LLM & embeddings)**
* **Docker (optional)**

---

## 🧩 Key Concepts Implemented

### ✅ Semantic Search

* Text chunking
* Embedding generation
* Vector similarity search using `pgvector`

### ✅ Retrieval Pipeline

* Top-K similarity search
* Context building for LLM

### ✅ Tool System

* Encapsulated retrieval logic as a **tool**
* Reusable and injectable (NestJS provider)

### ✅ AI Agent

* Uses LLM to decide:

  * Answer directly
  * OR call a tool

### ✅ Adaptive RAG

* Retrieval is **conditional**, not mandatory
* Reduces unnecessary calls and improves efficiency

---

## 🛠️ How It Works

### 1. Ingestion Pipeline

* Documents are split into chunks
* Each chunk is embedded
* Stored in PostgreSQL with `pgvector`

---

### 2. Retrieval (Tool)

```ts
searchDocuments(query) → returns relevant chunks
```

---

### 3. Agent Decision

The LLM receives:

* User question
* Available tools
* Instructions

And returns:

```json
{
  "tool": "searchDocuments",
  "input": { "query": "..." }
}
```

or

```json
{
  "answer": "..."
}
```

---

### 4. Response Generation

* If tool is used → RAG flow
* If not → direct LLM response

---

## 📡 API

### POST `/agent`

```json
{
  "question": "How does JWT authentication work?"
}
```

---

### Example Response

```json
{
  "usedTool": "searchDocuments",
  "answer": "...",
  "sources": [...]
}
```

---

## 🧪 Example Queries

* "How does JWT work?"
* "What is documented about authentication?"
* "Which authentication method do you prefer?"

---

## 📦 Running Locally

```bash
# install dependencies
npm install

# run database (if using docker)
docker-compose up -d

# start app
npm run start:dev
```

---

## 🧠 Why This Project Matters

This project demonstrates:

* Moving beyond static RAG pipelines
* Building **LLM-driven decision systems**
* Designing **tool-based architectures**
* Understanding **real-world AI system trade-offs**

---

## 🚀 Future Improvements

* Multi-agent architecture (Planner, Retriever, Reviewer)
* Tool registry with dynamic discovery
* Evaluation & observability (tracing, metrics)
* Hybrid search (keyword + vector)
* Re-ranking strategies

---

## 👨‍💻 Author

Developed as a hands-on exploration of modern AI system design, focusing on **practical, production-oriented patterns**.

---

## ⭐ Final Thoughts

This is not just a chatbot.

It is a **foundation for building real AI systems**, where:

> LLMs don't just generate text — they make decisions.

```
```
