export async function onRequest(context) {
  // Handle the "pre-flight" check from Safari/Chrome
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Only allow POST requests for the actual logic
  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { env } = context;
  
  try {
    const { prompt } = await context.request.json();

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${env.GEMINI_API_KEY}`, {
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
    
    // Safety check: if Gemini returns an error or empty result
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini");
    }

    const resultText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ text: resultText }), {
      headers: { 
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*" 
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate insight", details: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}