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
