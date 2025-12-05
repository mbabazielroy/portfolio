import { useState, useRef, useEffect } from 'react';
import { Mail, X as XIcon, RefreshCw, Sparkles } from 'lucide-react';
import { getLocalRecommendations, type RecommendationItem, type Persona } from '../services/recommender';
import { chatWithLocalLLM } from '../services/localLLM';
import type { Project } from '../types';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  recommendations?: RecommendationItem[];
  timestamp: Date;
  status?: 'ok' | 'error';
};

export default function ChatBot({ projects }: { projects: Project[] }) {
  const STORAGE_KEY = 'chat_messages_v1';
  const makeDefaultBotMessage = (): Message => ({
    id: 'intro',
    text: "Hey, I'm Elroy's assistant. Want to see projects, scope a build, or get career feedback? Tell me a goal (e.g., hire me, build a web app, review portfolio) and I'll tailor the next steps.",
    sender: 'bot',
    timestamp: new Date(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [makeDefaultBotMessage()];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{
          id: string;
          text: string;
          sender: 'user' | 'bot';
          timestamp: string;
          recommendations?: RecommendationItem[];
        }>;
        return parsed.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
      }
    } catch (err) {
      console.error('Failed to load stored chat messages', err);
    }
    return [makeDefaultBotMessage()];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [persona, setPersona] = useState<Persona>('assistant');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const serializable = messages.map((m) => ({
          ...m,
          timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
      } catch (err) {
        console.error('Failed to store chat messages', err);
      }
    }
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toChatHistory = (msgs: Message[]) =>
    msgs
      .filter((m) => m.text !== 'Thinking...')
      .map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.text,
      }));

  const handleSend = async (prompt?: string, opts?: { forceProjects?: boolean }) => {
    const query = (prompt ?? input).trim();
    if (query === '' || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: query,
      sender: 'user',
      timestamp: new Date(),
    };

      setMessages((prev) => [...prev, userMessage]);
      if (!prompt) setInput('');
      setIsLoading(true);
      setErrorState(null);

    if (isContactIntent(query)) {
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        text: contactReply,
        sender: 'bot',
        timestamp: new Date(),
        status: 'ok'
      }]);
      setIsLoading(false);
      return;
    }

    const wantsProjects = opts?.forceProjects || shouldRecommend(query);

    if (!wantsProjects) {
      const loadingId = Date.now().toString() + '-loading';
      setMessages(prev => [...prev, {
        id: loadingId,
        text: "Thinking...",
        sender: 'bot',
        timestamp: new Date()
      }]);
      try {
        const llmReply = await chatWithLocalLLM(persona, toChatHistory([...messages, userMessage]), projects);
        setMessages(prev => prev.filter(msg => msg.id !== loadingId));
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: llmReply,
          sender: 'bot',
          timestamp: new Date(),
          status: 'ok'
        }]);
      } catch (error) {
        console.error("LLM chat error:", error);
        setMessages(prev => prev.filter(msg => msg.id !== loadingId));
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: buildPersonaReply(persona, query),
          sender: 'bot',
          timestamp: new Date(),
          status: 'ok'
        }]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      const loadingId = Date.now().toString() + '-loading';
      setMessages(prev => [...prev, {
        id: loadingId,
        text: "Thinking...",
        sender: 'bot',
        timestamp: new Date()
      }]);

      const rec = await getLocalRecommendations(query, projects, 5, persona);

      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== loadingId);
        return [...filtered, {
          id: Date.now().toString(),
          text: rec.summary,
          recommendations: rec.items,
          sender: 'bot',
          timestamp: new Date(),
          status: 'ok'
        }];
      });
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        status: 'error'
      }]);
      setErrorState('Could not generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([makeDefaultBotMessage()]);
    setInput('');
    setErrorState(null);
    setPersona('assistant');
  };

  const handleClose = () => {
    handleClear();
    setIsOpen(false);
  };

  const handlePersonaSwitch = (next: Persona) => {
    setPersona(next);
    const personaGreeting = personaIntro(next);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: personaGreeting,
      sender: 'bot',
      timestamp: new Date(),
      status: 'ok'
    }]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const isGreeting = (text: string) => {
    const normalized = text.trim().toLowerCase();
    return ['hi', 'hey', 'hello', 'yo', 'sup', 'hiya'].includes(normalized);
  };

  const shouldRecommend = (query: string) => {
    const q = query.toLowerCase();
    const triggers = [
      /show (me )?(your )?projects/,
      /see (your )?projects/,
      /project list/,
      /your work/,
      /what (have you|you) built/,
      /portfolio/,
      /^projects?$/,
      /demos?/,
      /code links?/,
      /repos?/,
      /github/,
      /show all/,
    ];
    return triggers.some((re) => re.test(q));
  };

  const isContactIntent = (text: string) => {
    const q = text.toLowerCase();
    const contactWords = ['contact', 'reach', 'get in touch', 'email', 'hire', 'call'];
    const nameMention = q.includes('elroy');
    return nameMention || contactWords.some((w) => q.includes(w));
  };

  const contactReply = `You can reach Elroy directly:\n- Email: mbabazielroy@yahoo.com\n- Phone: +1 (437) 221-0664\n- LinkedIn: https://www.linkedin.com/in/elroy-mbabazi/\nHappy to help outline your project needs if you want to share scope, budget, and timeline.`;

  const personaIntro = (mode: Persona) => {
    switch (mode) {
      case 'recruiter':
        return "Recruiter mode on. I can review fit, summarize experience, and surface relevant projects. What roles and locations are you hiring for?";
      case 'engineer':
        return "Engineer mode on. We can talk architecture, stack choices, performance, or delivery plan. What's the problem or feature you're scoping?";
      case 'founder':
        return "Founder mode on. Let's shape an MVP, GTM, and milestones. What's the product idea, audience, and goal for the next 4 weeks?";
      default:
        return 'Assistant mode. Tell me if you want projects, to scope a build, or career feedback and I’ll tailor next steps.';
    }
  };

  const buildPersonaReply = (mode: Persona, query: string) => {
    const baseQuery = !query || isGreeting(query) ? '' : query;
    const needsContext = !baseQuery;
    switch (mode) {
      case 'recruiter':
        return needsContext
          ? 'Hi! Recruiter mode on. What roles, locations, and tech stack are you hiring for? I can summarize portfolio highlights or suggest how to position experience.'
          : `As a recruiter, I focus on fit. What roles and locations are you hiring for, and what stands out to you from this portfolio? Want a quick strengths summary?`;
      case 'engineer':
        return needsContext
          ? 'Engineer mode on. What stack or problem should we dig into? I can discuss architecture, tradeoffs, or code review topics.'
          : `Thinking as an engineer: want to discuss architecture, tradeoffs, or code patterns around "${baseQuery}"? What constraints or timelines are you working with?`;
      case 'founder':
        return needsContext
          ? 'Founder mode on. What product idea or target market are you exploring? I can help shape a lean MVP, GTM, and next steps.'
          : `From a founder lens: what's the product vision or target market for "${baseQuery}"? I can help shape an MVP and go-to-market next steps. What's the goal for the next 4 weeks?`;
      default:
        return needsContext
          ? 'Happy to help. Do you want project recommendations, portfolio feedback, or to chat through your goals?'
          : `Happy to help. Do you want project recommendations, portfolio feedback, or to chat about ${baseQuery}? What's the main outcome you want?`;
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
        aria-label="Open chat"
      >
        <Mail size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-[420px] max-w-[calc(100vw-24px)] h-[540px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <h3 className="font-semibold">Project Assistant</h3>
              </div>
              <p className="text-xs text-blue-100">Get tailored project recommendations.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition"
              >
                New chat
              </button>
              <button onClick={handleClose} className="text-white hover:text-gray-200">
                <XIcon size={20} />
              </button>
            </div>
          </div>

          {/* Quick prompts */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-3">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick prompts</div>
              <div className="flex flex-wrap gap-2">
                {['Frontend', 'Backend API', 'AI/ML', 'Mobile', 'Deployed apps', 'Show all'].map((label) => (
                  <button
                    key={label}
                    onClick={() => handleSend(label, { forceProjects: true })}
                    className="px-3 py-1 text-xs rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Persona</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Recruiter view', value: 'recruiter' as Persona },
                  { label: 'Founder view', value: 'founder' as Persona },
                  { label: 'Engineer view', value: 'engineer' as Persona }
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    onClick={() => handlePersonaSwitch(value)}
                    className="px-3 py-1 text-xs rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900">
            {messages.map((message) => {
              const isUser = message.sender === 'user';
              const isThinking = message.text === 'Thinking...';
              return (
                <div
                  key={message.id}
                  className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 flex items-center justify-center text-xs font-bold mr-2">
                      EA
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    <div className="text-[11px] mb-1 opacity-75">{formatTime(message.timestamp)}</div>
                    {isThinking ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : (
                      <>
                        {message.text.split('\n').map((line, i) => {
                          const boldPattern = /\*\*(.*?)\*\*/g;
                          const formattedLine = line.replace(boldPattern, '<strong>$1</strong>');
                          return (
                            <p
                              key={i}
                              className="whitespace-pre-wrap text-sm"
                              dangerouslySetInnerHTML={{ __html: formattedLine }}
                            />
                          );
                        })}
                        {message.recommendations && message.recommendations.length > 0 && (
                          <div className="mt-3 space-y-3">
                            {message.recommendations.map((recItem) => {
                              const proj = recItem.project;
                              const techs = proj.technologies || proj.tags || [];
                              const githubUrl = proj.githubUrl || proj.github || '';
                              const liveUrl = proj.liveUrl || proj.demo || '';
                              return (
                                <div
                                  key={proj.title}
                                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-sm"
                                >
                                  <div className="flex justify-between items-start gap-3">
                                    <div>
                                      <div className="font-semibold text-sm text-gray-900 dark:text-white">
                                        {proj.title}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                        {proj.description}
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      {githubUrl && (
                                        <a
                                          href={githubUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                          Code
                                        </a>
                                      )}
                                      {liveUrl && (
                                        <a
                                          href={liveUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                          Live
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                  {recItem.reason && (
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                                      {recItem.reason}
                                    </p>
                                  )}
                                  {techs.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {techs.slice(0, 6).map((tech) => (
                                        <span
                                          key={tech}
                                          className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {message.status === 'error' && (
                          <button
                            onClick={() => handleSend(input || 'Show all')}
                            className="mt-2 inline-flex items-center gap-1 text-xs text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                          >
                            <RefreshCw size={12} />
                            Retry
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center text-xs font-bold ml-2">
                      You
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            {errorState && (
              <div className="mb-2 text-xs text-red-500 flex items-center gap-2">
                <RefreshCw size={12} />
                {errorState}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Ask about projects, tech, or personas..."
                className="flex-1 px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                className={`px-4 py-3 rounded-xl ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition`}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
