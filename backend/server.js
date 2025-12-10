import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow requests from the frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false
}));
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback recommendation function that doesn't use OpenAI
function generateLocalRecommendations(query, projects) {
  // Convert query to lowercase for case-insensitive matching
  const queryLower = query.toLowerCase();

  // Extract keywords from the query
  const keywords = queryLower.split(/\s+/)
    .filter(word => word.length > 2) // Filter out short words
    .map(word => word.replace(/[.,;:!?]/g, '')); // Remove punctuation

  // Score each project based on keyword matches
  const scoredProjects = projects.map(project => {
    let score = 0;
    const title = project.title.toLowerCase();
    const description = project.description.toLowerCase();
    const technologies = (project.technologies || project.tags || []).map(t => t.toLowerCase());

    // Check for matches in title, description, and technologies
    keywords.forEach(keyword => {
      if (title.includes(keyword)) score += 3;
      if (description.includes(keyword)) score += 2;
      if (technologies.some(tech => tech.includes(keyword) || keyword.includes(tech))) score += 4;
    });

    return { project, score };
  });

  // Sort projects by score (highest first)
  scoredProjects.sort((a, b) => b.score - a.score);

  // Get top 3 projects or all if less than 3
  const topProjects = scoredProjects
    .filter(item => item.score > 0)
    .slice(0, 3)
    .map(item => item.project);

  // If no matches, return random 2 projects
  if (topProjects.length === 0) {
    const randomProjects = [...projects]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    return `I couldn't find exact matches for "${query}", but here are some projects you might find interesting:

${randomProjects.map(project => {
  const technologies = project.technologies || project.tags || [];
  return `**${project.title}**
${project.description}
Technologies: ${technologies.join(', ')}`;
}).join('\n\n')}

Feel free to ask about specific technologies or project types!`;
  }

  // Format the response
  return `Based on your interest in "${query}", here are some projects you might like:

${topProjects.map(project => {
  const technologies = project.technologies || project.tags || [];
  return `**${project.title}**
${project.description}
Technologies: ${technologies.join(', ')}`;
}).join('\n\n')}

Would you like more specific information about any of these projects?`;
}

// API endpoint for project recommendations
app.post('/api/recommendations', async (req, res) => {
  try {
    const { query, projects } = req.body;

    if (!query || !projects) {
      return res.status(400).json({ error: 'Query and projects are required' });
    }

    // Try to use OpenAI first
    try {
      // Format projects data for the prompt
      const projectsData = projects.map(project => {
        const technologies = project.technologies || project.tags || [];
        const githubUrl = project.githubUrl || project.github || '';
        const liveUrl = project.liveUrl || project.demo || '';

        return {
          title: project.title,
          description: project.description,
          technologies,
          links: { github: githubUrl, live: liveUrl }
        };
      });

      // Create a system prompt that explains the task
      const systemPrompt = `You are a helpful project recommendation assistant.
      Your task is to recommend projects from the portfolio based on the user's interests.
      Be conversational, friendly, and provide specific reasons why each project matches their interests.
      Format your response with project names in bold using markdown (**Project Name**).`;

      // Create the completion request
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // You can use gpt-4 for better results if available
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `I'm interested in: ${query}\n\nHere are the available projects:\n${JSON.stringify(projectsData, null, 2)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      // Send the response
      return res.json({
        recommendation: response.choices[0].message.content,
        source: "openai"
      });
    } catch (openaiError) {
      console.error('OpenAI API error, falling back to local recommendations:', openaiError.message);

      // If OpenAI fails, use local recommendation function
      const localRecommendation = generateLocalRecommendations(query, projects);

      return res.json({
        recommendation: localRecommendation,
        source: "local"
      });
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      error: 'Failed to generate recommendations',
      message: error.message
    });
  }
});

// Proxy endpoint for local LLM (Ollama or compatible)
const fallbackOpenAIModel = process.env.OPENAI_LLM_MODEL || 'gpt-3.5-turbo';

async function callOpenAI(messages) {
  const response = await openai.chat.completions.create({
    model: fallbackOpenAIModel,
    messages,
    temperature: 0.7,
    max_tokens: 600,
  });
  const content = response?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI returned an empty response');
  }
  return content;
}

app.post('/api/llm', async (req, res) => {
  const { messages, model } = req.body || {};
  const targetModel = model || process.env.LLM_MODEL || 'qwen2.5:0.5b';
  // const llmUrl = process.env.LLM_URL; // Disabled to force OpenAI path

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Ollama proxy logic is skipped when we always call OpenAI below.
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: 'OPENAI_API_KEY must be configured on the server to answer chat requests.',
    });
  }

  try {
    const content = await callOpenAI(messages);
    return res.json({ content, model: fallbackOpenAIModel, source: 'openai' });
  } catch (err) {
    console.error('OpenAI chat error:', err.message);
    return res.status(502).json({ error: 'OpenAI request failed', details: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for Vercel
export default app;
