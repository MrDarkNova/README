export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await req.json();
    const fullPrompt = body.messages?.[0]?.content ?? '';

    // Trim prompt to stay within URL limits — keep instructions + first 3000 chars of file content
    const trimmed = fullPrompt.length > 4000
      ? fullPrompt.slice(0, 4000) + '\n\n...Generate a complete professional README based on the above.'
      : fullPrompt;

    const url = `https://omegatech-api.dixonomega.tech/api/ai/Claude?text=${encodeURIComponent(trimmed)}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) throw new Error(`Upstream error: ${res.status}`);

    const data = await res.json();
    if (!data.success) throw new Error(data.result ?? 'API returned failure');

    return json({ content: [{ type: 'text', text: data.result }] });

  } catch (err) {
    return json({ error: err.message ?? 'Unknown error' }, 500);
  }
}
