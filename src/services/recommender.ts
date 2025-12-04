import type { Project } from '../types';

export type RecommendationItem = {
  project: Project;
  reason: string;
};

export type RecommendationResult = {
  summary: string;
  items: RecommendationItem[];
  persona?: Persona;
};

export type Persona = 'assistant' | 'recruiter' | 'engineer' | 'founder';

type ScoredProject = { project: Project; score: number };

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9+]+/i)
    .map((t) => t.trim())
    .filter(Boolean);
}

const stopwords = new Set([
  'a', 'an', 'and', 'the', 'for', 'to', 'of', 'in', 'on', 'at', 'with', 'hey', 'hi', 'hello', 'please', 'show', 'me'
]);

const keywordHints: Record<string, string[]> = {
  ai: ['openai', 'ai', 'ml', 'gpt', 'nlp'],
  mobile: ['mobile', 'expo', 'react native', 'android', 'ios'],
  backend: ['backend', 'api', 'server', 'prisma', 'firebase'],
  frontend: ['frontend', 'ui', 'react', 'next', 'tailwind'],
  data: ['data', 'analytics', 'cnn'],
  java: ['java'],
  deployed: ['live', 'demo', 'deployed', 'production'],
};

function detectPersona(tokens: string[]): string {
  const tokenSet = new Set(tokens);
  if (['recruiter', 'hiring', 'employer', 'talent', 'manager'].some((t) => tokenSet.has(t))) {
    return 'recruiter or hiring manager';
  }
  if (['founder', 'client', 'business', 'product', 'startup'].some((t) => tokenSet.has(t))) {
    return 'founder or client';
  }
  if (['student', 'class', 'school', 'course'].some((t) => tokenSet.has(t))) {
    return 'student';
  }
  return 'visitor';
}

function scoreProject(tokens: string[], project: Project): number {
  const title = project.title.toLowerCase();
  const description = project.description.toLowerCase();
  const stack = (project.technologies || project.tags || []).map((t) => t.toLowerCase());

  let score = project.liveUrl ? 0.75 : 0; // slight bump for live demos

  for (const token of tokens) {
    if (title.includes(token)) score += 4;
    if (description.includes(token)) score += 2;
    if (stack.some((tech) => tech.includes(token))) score += 3;
  }

  // category hints
  for (const [category, hints] of Object.entries(keywordHints)) {
    if (tokens.some((t) => hints.includes(t))) {
      if (
        title.includes(category) ||
        description.includes(category) ||
        stack.some((tech) => tech.includes(category))
      ) {
        score += category === 'deployed' ? 3 : 2;
      }
    }
  }

  return score;
}

function defaultPicks(projects: Project[]): Project[] {
  // Favor live demos, then by richness of stack
  return [...projects]
    .sort((a, b) => {
      const liveA = a.liveUrl ? 1 : 0;
      const liveB = b.liveUrl ? 1 : 0;
      const stackA = (a.technologies || a.tags || []).length;
      const stackB = (b.technologies || b.tags || []).length;
      return liveB - liveA || stackB - stackA;
    })
    .slice(0, 4);
}

function buildReason(project: Project, tokens: string[]): string {
  const stack = (project.technologies || project.tags || []).map((t) => t.toLowerCase());
  const matches = tokens.filter(
    (t) =>
      stack.some((s) => s.includes(t)) ||
      project.title.toLowerCase().includes(t) ||
      project.description.toLowerCase().includes(t)
  );

  const parts: string[] = [];
  if (matches.length) {
    parts.push(`Matches: ${matches.slice(0, 3).join(', ')}`);
  }
  if (project.liveUrl) {
    parts.push('Includes a live demo');
  }
  if (!matches.length && stack.length) {
    parts.push(`Tech: ${stack.slice(0, 3).join(', ')}`);
  }
  if (!parts.length) {
    parts.push('Strong fit for the portfolio audience.');
  }
  return parts.join('. ');
}

export async function getLocalRecommendations(
  query: string,
  projects: Project[],
  max = 5,
  persona: Persona = 'assistant'
): Promise<RecommendationResult> {
  const tokens = tokenize(query);
  const filteredTokens = tokens.filter((t) => !stopwords.has(t));
  const detectedPersona = detectPersona(filteredTokens);

  const scored: ScoredProject[] = projects.map((project) => ({
    project,
    score: filteredTokens.length ? scoreProject(filteredTokens, project) : 0,
  }));

  const top = filteredTokens.length
    ? scored
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, max)
        .map((item) => item.project)
    : defaultPicks(projects);

  const selected = top.length ? top : defaultPicks(projects);

  const items: RecommendationItem[] = selected.map((project) => ({
    project,
    reason: buildReason(project, filteredTokens),
  }));

  const personaLead: Record<Persona, string> = {
    assistant: 'Here are projects I recommend',
    recruiter: 'As a recruiter, here are projects worth highlighting',
    engineer: 'As an engineer, here are technically relevant projects',
    founder: 'From a founder lens, here are projects to review',
  };

  const summary = top.length
    ? filteredTokens.length
      ? `${personaLead[persona]} based on "${query}":`
      : `${personaLead[persona]} to start with:`
    : "I couldn't match that query. Here are a few strong projects you can review:";

  return { summary, items, persona: detectedPersona };
}
