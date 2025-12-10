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

## OpenAI chat configuration

The `/api/llm` endpoint now directly relays conversations through OpenAI. Provide the API key in the environment and the backend handles the model request internally.

### Environment variables

- `OPENAI_API_KEY`: required for chat responses via the OpenAI API.
- `OPENAI_LLM_MODEL`: optional override for the OpenAI model (defaults to `gpt-3.5-turbo`).

### Vercel recommendation deployment

Set `OPENAI_API_KEY` (and optionally `OPENAI_LLM_MODEL`) on Vercel. The frontend is already wired to `/api/llm` (`VITE_OPENAI_URL=/api/llm`), so no other client-side changes are required.
