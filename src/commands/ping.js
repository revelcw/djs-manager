import { SlashCommandBuilder } from 'discord.js';

// Example ping command in js.
const execute = async ({ client, interaction }) => {
  interaction.reply('Pong! 🏓');
};

export const command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};
