# Portfolio Project Recommendation API

This is a simple Express.js server that provides an API for generating project recommendations using OpenAI.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   PORT=3001
   ```

3. Start the server:
   ```
   npm start
   ```

## API Endpoints

### POST /api/recommendations

Generates project recommendations based on user query and available projects.

**Request Body:**
```json
{
  "query": "React and TypeScript",
  "projects": [
    {
      "title": "Project Title",
      "description": "Project Description",
      "technologies": ["React", "TypeScript"],
      "githubUrl": "https://github.com/user/repo",
      "liveUrl": "https://example.com"
    }
  ]
}
```

**Response:**
```json
{
  "recommendation": "Based on your interest in React and TypeScript, I recommend checking out **Project Title**..."
}
```

## LLM proxy configuration

The `/api/llm` endpoint proxies chat requests to your chosen LLM service and now automatically falls back to OpenAI when that service is unreachable.

### Environment variables

- `LLM_URL`: public HTTPS URL of your self-hosted Ollama (or compatible) server, e.g. `https://ollama.example.com/api/chat`. When provided, `/api/llm` forwards messages to that address.
- `OLLAMA_API_KEY` (optional): put the Ollama Cloud key here so the proxy can send it as `Authorization: Bearer …`. Only set this if your endpoint requires the key.
- `OPENAI_API_KEY`: keeps chat working when Ollama is offline; the proxy retries against OpenAI with this key after the Ollama proxy request fails.
- `OPENAI_LLM_MODEL`: optional override for the OpenAI fallback model (defaults to `gpt-3.5-turbo`).

### Hosting Ollama remotely

1. Run Ollama on a machine you control (cloud VM, VPS, etc.) and expose it via HTTPS (`https://your-domain/api/chat`).
2. Set `LLM_URL` in the backend environment (local `.env` for development and Vercel's Environment Variables for production) to that `/api/chat` endpoint.
3. Keep `OPENAI_API_KEY` configured so the backend can continue serving chats when Ollama is unavailable, and optionally tune `OPENAI_LLM_MODEL`.

### Vercel recommendation deployment

Set `LLM_URL`, `OPENAI_API_KEY`, and (if desired) `OPENAI_LLM_MODEL` on Vercel. The frontend already points at `/api/llm` (`VITE_LLM_URL=/api/llm`), so no other client-side changes are needed.
