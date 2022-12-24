import * as discordjs from 'discord.js';
import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { Execute } from '../types/Execute.types';
dotenv.config();

const execute = async ({ client, interaction }: Execute) => {
  // const options = interaction.options as discordjs.CommandInteractionOptionResolver

  interaction.reply('Pong! 🏓');
};

export const command = {
  // data: new ContextMenuCommandBuilder()
  //   .setName('ping')
  //   .setType(ApplicationCommandType.Message),
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};
