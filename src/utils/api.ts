export async function generateReadme(prompt: string): Promise<string> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));

  if (!response.ok || data.error) {
    throw new Error(
      typeof data.error === 'string'
        ? data.error
        : data.error?.message ?? `Request failed (${response.status})`
    );
  }

  const content = (data.content as { type: string; text: string }[]);
  const text = content?.filter(b => b.type === 'text').map(b => b.text).join('');
  if (!text) throw new Error('Empty response from AI');
  return text;
}
