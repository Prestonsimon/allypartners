export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { name, email, firm, message, recaptchaToken } = body;

    // 1. Verify reCAPTCHA v3 with Google
    // Ensure RECAPTCHA_SECRET_KEY is set in Cloudflare Settings -> Functions
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
    );
    
    const recaptchaData = await recaptchaResponse.json();

    // If Google score is too low (bot) or verification fails
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return new Response(
        JSON.stringify({ error: 'Security verification failed. Please try again.' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Send the Email via Resend API
    // Since your domain is verified, this will now work perfectly
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ally Partners Web <info@ally-partners.com>', 
        to: 'info@ally-partners.com', 
        reply_to: email, // This allows you to hit 'Reply' in your email app to talk to the lead
        subject: `New Inquiry: ${firm || name}`,
        text: `
          New inquiry received via ally-partners.com
          
          Name: ${name}
          Email: ${email}
          Firm: ${firm || 'Not specified'}
          
          Message:
          ${message}
          
          ---
          Security Score: ${recaptchaData.score}
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("Resend API Error:", errorData);
      throw new Error("Email service failed");
    }

    return new Response(
      JSON.stringify({ success: true }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Worker Error:", error);
    return new Response(
      JSON.stringify({ error: 'Server error. Please try again later.' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}