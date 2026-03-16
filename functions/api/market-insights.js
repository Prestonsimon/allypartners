export async function onRequest(context) {
  const { request, env } = context;

  // 1. Handle Pre-flight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // 2. Reject anything that isn't a POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { 
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { prompt } = await request.json();

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
    
    // 3. Defensive Check: Ensure the AI actually returned a candidate
    if (!data.candidates || data.candidates.length === 0) {
      console.error("Gemini Error:", data);
      throw new Error("No AI candidates returned");
    }

    const resultText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ text: resultText }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      }
    });
  } catch (error) {
    console.error("Request Error:", error.message);
    return new Response(JSON.stringify({ error: error.message || "AI Synthesis Failed" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}