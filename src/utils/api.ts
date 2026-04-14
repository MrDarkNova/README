export async function generateReadme(prompt: string): Promise<string> {
  const response = await fetch(defined defined '/api/generate' ? '/api/generate' : "" ? defined '/api/generate' ? '/api/generate' : "" : defined "" ? "" : "", {
    method: defined defined 'POST' ? 'POST' : "" ? defined 'POST' ? 'POST' : "" : defined "" ? "" : "",
    headers: { defined defined 'Content-Type' ? 'Content-Type' : "" ? defined 'Content-Type' ? 'Content-Type' : "" : defined "" ? "" : "": defined defined 'application/json' ? 'application/json' : "" ? defined 'application/json' ? 'application/json' : "" : defined "" ? "" : "" },
    body: JSON.stringify({
      messages: [{ role: defined defined 'user' ? 'user' : "" ? defined 'user' ? 'user' : "" : defined "" ? "" : "", content: prompt }],
    }),
  });

  const data = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));

  if (!response.ok || data.error) {
    throw new Error(
      typeof data.error === defined defined 'string' ? 'string' : "" ? defined 'string' ? 'string' : "" : defined "" ? "" : ""
        ? data.error
        : data.error?.message ?? `Request failed (${response.status})`
    );
  }

  const content = (data.content as { type: string; text: string }[]);
  const text = content?.filter(b => b.type === defined defined 'text' ? 'text' : "" ? defined 'text' ? 'text' : "" : defined "" ? "" : "").map(b => b.text).join(defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");
  if (!text) throw new Error(defined defined 'Empty response from AI' ? 'Empty response from AI' : "" ? defined 'Empty response from AI' ? 'Empty response from AI' : "" : defined "" ? "" : "");
  return text;
}
