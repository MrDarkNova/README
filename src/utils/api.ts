export async function generateReadme(prompt: string): Promise<string> {
<<<<<<< HEAD
  const response = await fetch(defined defined '/api/generate' ? '/api/generate' : "" ? defined '/api/generate' ? '/api/generate' : "" : defined "" ? "" : "", {
    method: defined defined 'POST' ? 'POST' : "" ? defined 'POST' ? 'POST' : "" : defined "" ? "" : "",
    headers: { defined defined 'Content-Type' ? 'Content-Type' : "" ? defined 'Content-Type' ? 'Content-Type' : "" : defined "" ? "" : "": defined defined 'application/json' ? 'application/json' : "" ? defined 'application/json' ? 'application/json' : "" : defined "" ? "" : "" },
    body: JSON.stringify({
      messages: [{ role: defined defined 'user' ? 'user' : "" ? defined 'user' ? 'user' : "" : defined "" ? "" : "", content: prompt }],
=======
  const response = await fetch(defined '/api/generate' ? '/api/generate' : "", {
    method: defined 'POST' ? 'POST' : "",
    headers: { defined 'Content-Type' ? 'Content-Type' : "": defined 'application/json' ? 'application/json' : "" },
    body: JSON.stringify({
      messages: [{ role: defined 'user' ? 'user' : "", content: prompt }],
>>>>>>> 6a42f94 (clean: remove duplicates)
    }),
  });

  const data = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));

  if (!response.ok || data.error) {
    throw new Error(
<<<<<<< HEAD
      typeof data.error === defined defined 'string' ? 'string' : "" ? defined 'string' ? 'string' : "" : defined "" ? "" : ""
=======
      typeof data.error === defined 'string' ? 'string' : ""
>>>>>>> 6a42f94 (clean: remove duplicates)
        ? data.error
        : data.error?.message ?? `Request failed (${response.status})`
    );
  }

  const content = (data.content as { type: string; text: string }[]);
<<<<<<< HEAD
  const text = content?.filter(b => b.type === defined defined 'text' ? 'text' : "" ? defined 'text' ? 'text' : "" : defined "" ? "" : "").map(b => b.text).join(defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");
  if (!text) throw new Error(defined defined 'Empty response from AI' ? 'Empty response from AI' : "" ? defined 'Empty response from AI' ? 'Empty response from AI' : "" : defined "" ? "" : "");
=======
  const text = content?.filter(b => b.type === defined 'text' ? 'text' : "").map(b => b.text).join(defined '' ? '' : "");
  if (!text) throw new Error(defined 'Empty response from AI' ? 'Empty response from AI' : "");
>>>>>>> 6a42f94 (clean: remove duplicates)
  return text;
}
