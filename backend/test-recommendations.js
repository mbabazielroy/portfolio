import fetch from 'node-fetch';

// Sample projects data
const sampleProjects = [
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website built with modern technologies",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/user/portfolio",
    demo: "https://portfolio.example.com"
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with product listings and checkout",
    technologies: ["Next.js", "MongoDB", "Stripe", "Redux"],
    githubUrl: "https://github.com/user/ecommerce",
    liveUrl: "https://store.example.com"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather information with interactive maps",
    tags: ["JavaScript", "OpenWeatherAPI", "Chart.js", "Leaflet"],
    github: "https://github.com/user/weather",
    demo: "https://weather.example.com"
  },
  {
    title: "Task Management App",
    description: "A productivity tool for organizing and tracking tasks",
    technologies: ["React", "Firebase", "Material UI", "PWA"],
    githubUrl: "https://github.com/user/tasks",
    liveUrl: "https://tasks.example.com"
  }
];

// Test queries
const testQueries = [
  "React projects",
  "e-commerce applications",
  "weather apps",
  "TypeScript and Tailwind",
  "something with databases",
  "mobile-friendly applications"
];

// Function to test the recommendation API
async function testRecommendationAPI() {
  console.log("Testing Recommendation API (Local Fallback System)\n");
  console.log("=".repeat(60));

  for (const query of testQueries) {
    console.log(`\nQuery: "${query}"`);
    console.log("-".repeat(60));

    try {
      const response = await fetch('http://localhost:3001/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          projects: sampleProjects
        }),
      });

      const data = await response.json();

      console.log(`Source: ${data.source}`);
      console.log(`\nRecommendation:\n${data.recommendation}`);
      console.log("\n" + "=".repeat(60));
    } catch (error) {
      console.error(`Error testing query "${query}":`, error.message);
    }
  }
}

// Run the test
testRecommendationAPI();
