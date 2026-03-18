exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const RESEND_KEY = 're_cC4v9a9b_HhQQBFVsN6G1BFxW9y9prR7H';

  try {
    const { to, subject, html } = JSON.parse(event.body);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nounours Barber <contact@nounours-barber.shop>',
        to: [to],
        subject,
        html,
      }),
    });

    const data = await res.json();

    return {
      statusCode: res.ok ? 200 : 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
