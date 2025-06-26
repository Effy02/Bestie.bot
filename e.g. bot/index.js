import express from 'express';
import dotenv from 'dotenv';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf } }));

app.post(
  '/api/interactions',
  verifyKeyMiddleware(process.env.PUBLIC_KEY, (req) => req.rawBody),
  (req, res) => {
    const interaction = req.body;

    if (interaction.type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      const { name, options } = interaction.data;

      if (name === 'bestie') {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: 'You called, bestie? 💅' },
        });
      }

      if (name === 'spill') {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: 'Spill the tea, I’m listening ☕👀' },
        });
      }

      if (name === 'hug') {
        const user = options[0].value;
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Bestie gave <@${user}> a warm and squishy hug 🤗💖`,
          },
        });
      }

      if (name === 'advice') {
        const responses = [
          'Dump him 😒',
          'Block and glow up 💅',
          'Girl be serious 😭',
          "You're the problem... and I support you 💖",
          'Touch grass 🌱',
        ];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: responses[Math.floor(Math.random() * responses.length)],
          },
        });
      }

      if (name === 'vibecheck') {
        const vibes = [
          'Slaying 🔥',
          'Crying in the club 😭',
          'You ATE that',
          'Wearing socks with sandals today 🧦🩴',
        ];
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: vibes[Math.floor(Math.random() * vibes.length)],
          },
        });
      }

      if (name === 'selfiecheck') {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Post that selfie. You're literally mother. 💁‍♀️📸",
          },
        });
      }

      if (name === 'affirmation') {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'You are hot. You are smart. You are THAT girl 💖',
          },
        });
      }
    }
  }
);

app.get('/', (req, res) => {
  res.send('✨ BestieBot is alive and slaying! ✨');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`BestieBot running on port ${PORT}`);
});
