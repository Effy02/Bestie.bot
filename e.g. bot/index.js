app.post(
  '/api/interactions',
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  (req, res) => {
    const interaction = req.body;

    // Handle initial verification
    if (interaction.type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    // Handle slash commands
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      const { name, options } = interaction.data;

      if (name === 'bestie') {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'You called, bestie? 💅',
          },
        });
      }

      if (name === 'spill') {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Spill the tea, I’m listening ☕👀',
          },
        });
      }

      if (name === 'hug') {
        const user = options[0].value;
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Bestie gave <@${user}> a squishy hug 🤗💖`,
          },
        });
      }
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`BestieBot running on port ${port}`); });
// index.js
// just triggering redeploy
