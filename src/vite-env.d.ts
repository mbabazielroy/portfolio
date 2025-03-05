/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Remove the direct OpenAI API key since we're using the backend now
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
