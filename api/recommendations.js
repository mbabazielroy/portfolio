import { OpenAI } from 'openai';

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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
      return res.status(200).json({
        recommendation: response.choices[0].message.content,
        source: "openai"
      });
    } catch (openaiError) {
      console.error('OpenAI API error, falling back to local recommendations:', openaiError.message);

      // If OpenAI fails, use local recommendation function
      const localRecommendation = generateLocalRecommendations(query, projects);

      return res.status(200).json({
        recommendation: localRecommendation,
        source: "local"
      });
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return res.status(500).json({
      error: 'Failed to generate recommendations',
      message: error.message
    });
  }
}
