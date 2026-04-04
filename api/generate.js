export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await req.json();
    const prompt = body.messages?.[0]?.content ?? '';

    const response = await fetch(
      `https://omegatech-api.dixonomega.tech/api/ai/Claude?text=${encodeURIComponent(prompt)}`
    );

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.result ?? 'API error');
    }

    return new Response(
      JSON.stringify({
        content: [{ type: 'text', text: data.result }],
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
