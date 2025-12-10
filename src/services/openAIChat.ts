import type { Persona } from './recommender';
import type { Project } from '../types';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const DEFAULT_URL = import.meta.env.VITE_OPENAI_URL || '/api/llm';
const DEFAULT_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo';

function buildSystemPrompt(persona: Persona, projects: Project[]): string {
  const personaInstructions: Record<Persona, string> = {
    assistant:
      'You are a helpful, conversational assistant for a developer portfolio. Have natural, human-like conversations, ask follow-ups, and never list projects unless the user explicitly asks to see projects.',
    recruiter:
      'You are a professional recruiter. Speak naturally, focus on hiring needs, roles, locations, skills, culture fit, and resume highlights. Do not list projects unless explicitly asked.',
    engineer:
      'You are a senior software engineer. Talk through architecture, tradeoffs, code, and planning. Ask clarifying technical questions. Do not list projects unless explicitly asked.',
    founder:
      'You are a startup founder. Discuss product strategy, vision, MVP, GTM, and growth. Ask discovery questions. Do not list projects unless explicitly asked.',
  };

  const projectTitles = projects.map((p) => p.title).slice(0, 15).join(', ');

  return [
    personaInstructions[persona],
    'Priority: converse like ChatGPT, show understanding, ask relevant follow-ups.',
    'Only provide project lists if the user explicitly requests projects/portfolio/repo. Otherwise, stay conversational.',
    `Available project titles (for reference only when asked): ${projectTitles}.`,
  ].join(' ');
}

export async function chatWithOpenAI(
  persona: Persona,
  history: ChatMessage[],
  projects: Project[]
): Promise<string> {
  const systemPrompt = buildSystemPrompt(persona, projects);
  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history,
  ];

  try {
    const response = await fetch(DEFAULT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI proxy responded with status ${response.status}`);
    }

    const data = await response.json();
    // Handle both proxy shape { content } and typical OpenAI response shapes
    const content =
      data?.content ??
      data?.message?.content ??
      data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from OpenAI proxy');
    }
    return content;
  } catch (error) {
    console.error('OpenAI chat error:', error);
    return 'I had trouble contacting the OpenAI chat service. Please try again shortly.';
  }
}
