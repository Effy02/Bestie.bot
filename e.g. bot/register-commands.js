import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const APPLICATION_ID = process.env.APPLICATION_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

const commands = [
  {
    name: 'bestie',
    description: 'Summon your bestie 💅',
  },
  {
    name: 'spill',
    description: 'Spill the tea, bestie ☕👀',
  },
  {
    name: 'hug',
    description: 'Give someone a warm hug 🤗💖',
    options: [
      {
        name: 'user',
        description: 'The user you want to hug',
        type: 6, // USER
        required: true,
      },
    ],
  },
  {
    name: 'advice',
    description: 'Let bestie give you life advice 💀',
  },
  {
    name: 'vibecheck',
    description: 'Check the current vibe 😌',
  },
  {
    name: 'selfiecheck',
    description: 'Should you post that selfie? 👑',
  },
  {
    name: 'affirmation',
    description: 'Get your daily affirmation 💖',
  },
];

const registerCommands = async () => {
  const response = await fetch(`https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${BOT_TOKEN}`,
    },
    body: JSON.stringify(commands),
  });

  if (response.ok) {
    console.log('✨ Commands registered globally!');
  } else {
    const error = await response.text();
    console.error('❌ Failed to register commands:', error);
  }
};

registerCommands();
