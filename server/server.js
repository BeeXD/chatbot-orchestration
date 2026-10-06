import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
// Serve static files from Vite build (dist) in production
app.use(express.static(path.resolve('dist')));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', service: 'AI ChatBot SSE Streaming Gateway', timestamp: new Date().toISOString() });
});

/**
 * SSE Endpoint: Stream LLM token-by-token response
 * POST /api/chat/stream
 */
app.post('/api/chat/stream', async (req, res) => {
  const { message, bot } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  // Set standard SSE Headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Disable proxy buffering
  res.flushHeaders();

  const botName = bot?.name || 'AI Assistant';
  const platform = bot?.platform || 'Web';
  const model = bot?.model || 'GPT-4o';
  const intents = bot?.intents || [];

  // Match intent or generate contextual stream
  const lowerMsg = message.toLowerCase();
  const matchedIntent = intents.find(i => lowerMsg.includes(i.toLowerCase()));

  let fullResponse = '';
  if (matchedIntent) {
    fullResponse = `Recognized Intent: [${matchedIntent}]. Routing through ${platform} gateway using ${model} engine. All verification checks have passed and your requested payload is being dispatched!`;
  } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    fullResponse = `Greetings! I am ${botName}, connected to the ${platform} live messaging endpoint. I'm trained to assist you with: ${intents.join(', ')}. How can I help?`;
  } else {
    fullResponse = `Query received: "${message}". Processed through ${platform} webhook listener. My registered knowledge domains include: ${intents.slice(0, 3).join(', ')}. Feel free to query any of these!`;
  }

  // Tokenize response into words and stream with realistic delay
  const tokens = fullResponse.split(' ');

  for (let i = 0; i < tokens.length; i++) {
    // If client disconnected, stop
    if (res.writableEnded) break;

    const token = (i === 0 ? '' : ' ') + tokens[i];
    res.write(`data: ${JSON.stringify({ token, done: false })}\n\n`);

    // Simulated streaming latency (35ms per token)
    await new Promise(resolve => setTimeout(resolve, 35));
  }

  // Send completion signal
  if (!res.writableEnded) {
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  }
});

/**
 * SSE Endpoint: Live Gateway Telemetry & Webhook Events
 * GET /api/telemetry/stream
 */
app.get('/api/telemetry/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial connected event
  res.write(`data: ${JSON.stringify({ type: 'connected', message: 'SSE Telemetry Stream Established' })}\n\n`);

  const platforms = ['WhatsApp', 'Slack', 'Web', 'Discord', 'Teams'];
  const sampleEvents = [
    'Inbound user session initiated',
    'Intent classification verified',
    'Webhook delivery acknowledged',
    'Response payload synthesized',
    'Session closed with 5-star rating'
  ];

  // Emit simulated live telemetry every 6 seconds
  const interval = setInterval(() => {
    if (res.writableEnded) {
      clearInterval(interval);
      return;
    }

    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
    const randomAction = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];

    const eventPayload = {
      type: 'webhook_ping',
      platform: randomPlatform,
      action: randomAction,
      timestamp: new Date().toLocaleTimeString(),
      latency: Math.floor(Math.random() * 80 + 90) + 'ms'
    };

    res.write(`data: ${JSON.stringify(eventPayload)}\n\n`);
  }, 6000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`[SSE Gateway Server] Listening on http://localhost:${PORT}`);
  console.log(`- Chat SSE: POST http://localhost:${PORT}/api/chat/stream`);
  console.log(`- Telemetry SSE: GET http://localhost:${PORT}/api/telemetry/stream`);
});

// SPA fallback: serve index.html for any non‑API route
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});
