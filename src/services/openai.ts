import type { Project } from '../types';

// API URL (use environment variable for flexibility)
// In production, this will be the same domain as your frontend
const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function getProjectRecommendations(
  query: string,
  projects: Project[]
): Promise<string> {
  try {
    // Show loading state in UI if needed
    const response = await fetch(`${API_URL}/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, projects }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get recommendations');
    }

    const data = await response.json();
    return data.recommendation;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return "Sorry, I encountered an error while generating recommendations. Please try again later.";
  }
}
