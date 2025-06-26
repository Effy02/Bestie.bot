import express from 'express';
import dotenv from 'dotenv';
import { verifyKeyMiddleware } from 'discord-interactions';

dotenv.config();

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PUBLIC_KEY = process.env.PUBLIC_KEY;
if (!PUBLIC_KEY) {
  console.error('ERROR: Missing PUBLIC_KEY in environment variables!');
  process.exit(1);
}

app.post('/api/interactions', verifyKeyMiddleware(PUBLIC_KEY), (req, res) => {
  const interaction = req.body;
  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Heyy bestie! 💅 I’m alive.' }
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`BestieBot running on port ${port}`); });
// index.js
// just triggering redeploy
