export async function onRequest(context) {
  const { request, env } = context;

  // 1. Handle Pre-flight (CORS)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { 
      status: 405, 
      headers: { "Content-Type": "application/json" } 
    });
  }

  try {
    const { prompt } = await request.json();

    // Use the 2.0 version which is the 2026 stable standard
    const modelId = "gemini-2.0-flash"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${env.GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          role: "user", 
          parts: [{ text: `Persona: Senior consultant at Ally Partners, Jersey. Tone: Professional, authoritative. Limit: 500 chars. \n\n Request: ${prompt}` }] 
        }],
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();

    // If Google returns an error (like a 404 or 400), pass it through to your logs
    if (data.error) {
      console.error("Google API Error:", data.error.message);
      return new Response(JSON.stringify({ error: data.error.message }), { 
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Strategic synthesis complete.";

    return new Response(JSON.stringify({ text: resultText }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      }
    });
  } catch (error) {
    console.error("Pages Function Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}