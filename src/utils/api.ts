interface TextBlock {
  type?: string;
  text?: string;
}

interface GenerationPayload {
  error?: unknown;
  content?: unknown;
  output_text?: unknown;
  choices?: Array<{ message?: { content?: unknown } }>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getErrorText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (isRecord(value) && typeof value.message === 'string') return value.message;
  return 'The README service couldn’t complete the request.';
}

export async function generateReadme(prompt: string, signal?: AbortSignal): Promise<string> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
    signal,
  });

  let payload: GenerationPayload = {};
  try {
    const parsed: unknown = await response.json();
    if (isRecord(parsed)) payload = parsed as GenerationPayload;
  } catch {
    if (response.ok) throw new Error('The README service returned an unreadable response.');
  }

  if (!response.ok || payload.error) {
    throw new Error(getErrorText(payload.error) || `Request failed (${response.status}).`);
  }

  if (typeof payload.content === 'string') return payload.content.trim();
  if (Array.isArray(payload.content)) {
    const text = (payload.content as TextBlock[])
      .filter((block) => block?.type === 'text' && typeof block.text === 'string')
      .map((block) => block.text)
      .join('')
      .trim();
    if (text) return text;
  }

  if (typeof payload.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const choiceText = payload.choices?.[0]?.message?.content;
  if (typeof choiceText === 'string' && choiceText.trim()) return choiceText.trim();
  throw new Error('The README service returned an empty response. Please try again.');
}