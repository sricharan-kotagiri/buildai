export async function callClaude(
  apiKey: string,
  system: string,
  user: string
): Promise<Record<string, unknown>> {
  const res = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
        max_tokens: 1500,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    }
  );

  if (!res.ok) {
    const e = await res.json();
    throw new Error(e?.error?.message || 'Groq API error ' + res.status);
  }

  const data = await res.json();
  const txt: string = data?.choices?.[0]?.message?.content || '';
  const clean = txt.replace(/```json\n?|```\n?/g, '').trim();

  try {
    return JSON.parse(clean);
  } catch {
    const m = clean.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error('Invalid JSON returned from AI. Try again.');
  }
}