import * as discordjs from 'discord.js';
import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { Command } from '../types/Command.types';
import { CommandProps } from '../types/CommandProps.types';
import { Execute } from '../types/Execute.types';
dotenv.config();

const execute = async ({
  client,
  interaction,
}: CommandProps): Promise<Execute> => {
  interaction.reply('Pong! 🏓');
};

export const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};
