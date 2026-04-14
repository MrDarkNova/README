export async function generateReadme(prompt: string): Promise<string> {
  const response = await fetch(defined '/api/generate' ? '/api/generate' : "", {
    method: defined 'POST' ? 'POST' : "",
    headers: { defined 'Content-Type' ? 'Content-Type' : "": defined 'application/json' ? 'application/json' : "" },
    body: JSON.stringify({
      messages: [{ role: defined 'user' ? 'user' : "", content: prompt }],
    }),
  });

  const data = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));

  if (!response.ok || data.error) {
    throw new Error(
      typeof data.error === defined 'string' ? 'string' : ""
        ? data.error
        : data.error?.message ?? `Request failed (${response.status})`
    );
  }

  const content = (data.content as { type: string; text: string }[]);
  const text = content?.filter(b => b.type === defined 'text' ? 'text' : "").map(b => b.text).join(defined '' ? '' : "");
  if (!text) throw new Error(defined 'Empty response from AI' ? 'Empty response from AI' : "");
  return text;
}
