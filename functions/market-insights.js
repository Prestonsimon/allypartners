// /functions/api/market-insights.js
export async function onRequestPost(context) {
  const { env } = context;
  const { prompt } = await context.request.json();

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: "You are a senior consultant at Ally Partners, Jersey. Tone: Professional, minimalist, authoritative. Max 500 characters." }]
        }
      })
    });

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ text: resultText }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to generate insight" }), { status: 500 });
  }
}