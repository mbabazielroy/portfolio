import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const llmUrl = process.env.LLM_URL || 'http://localhost:11434/api/chat';
const llmModel = process.env.LLM_MODEL || 'qwen2.5:0.5b';

async function main() {
  try {
    const res = await fetch(llmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: llmModel,
        messages: [{ role: 'user', content: 'health check' }],
        stream: false,
      }),
    });
    if (!res.ok) {
      console.error(`LLM health failed: ${res.status} ${res.statusText}`);
      process.exit(1);
    }
    const data = await res.json();
    const content = data?.message?.content || data?.choices?.[0]?.message?.content;
    console.log(`LLM OK (${llmModel}): ${content?.slice(0, 80) || 'no content'}`);
    process.exit(0);
  } catch (err) {
    console.error(`LLM health failed: ${err.message}`);
    process.exit(1);
  }
}

main();
