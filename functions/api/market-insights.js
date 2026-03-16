export async function onRequest(context) {
  const { request, env } = context;

  // 1. Handle Pre-flight (CORS) - Required for browser security
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // 2. Security Check: Only allow POST requests
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { 
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 3. Configuration Check: Verify API Key is present in Cloudflare
  if (!env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: "API Key not configured in environment" }), { status: 500 });
  }

  try {
    const { prompt } = await request.json();

    // Use the 2026 workhorse model: Gemini 3 Flash
    const modelId = "gemini-3-flash-preview"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${env.GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
    }],
    systemInstruction: {
      parts: [{ 
        text: "You are a senior strategic consultant at Ally Partners, Jersey. " +
              "Provide authoritative, high-impact insights for alternative asset managers. " +
              "Your response should be 2-3 complete, sophisticated sentences. " +
              "Never stop mid-sentence. Ensure the thought is fully synthesized." 
      }]
    },
    generationConfig: {
      maxOutputTokens: 800, // Increased from 400 to prevent cut-offs
      temperature: 0.7,     // Slightly higher for better flow
    }
  })
});

    const data = await response.json();

    // 4. Handle API-level errors (e.g., quota, invalid key)
    if (data.error) {
      console.error("Gemini API Error:", data.error.message);
      return new Response(JSON.stringify({ error: data.error.message }), { 
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 5. Extract text safely
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      throw new Error("No intelligence synthesis returned from AI.");
    }

    return new Response(JSON.stringify({ text: resultText }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      }
    });

  } catch (error) {
    console.error("Request Failure:", error.message);
    return new Response(JSON.stringify({ 
      error: "Strategic synthesis failed.", 
      details: error.message 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}