import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/Command.types';
import { ExecuteParams } from '../types/ExecuteParams';
import { Execute } from '../types/Execute.types';

// Example ping command.
const execute = async ({
  client,
  interaction,
}: ExecuteParams): Promise<Execute> => {
  interaction.reply('Pong! 🏓');
};

export const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};
