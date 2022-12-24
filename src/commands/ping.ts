import * as discordjs from 'discord.js';
import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { BaseCommand } from '../types/BaseCommand.types';
import { CommandProps } from '../types/CommandProps.types';
dotenv.config();

const execute = async ({
  client,
  interaction,
}: CommandProps): Promise<void> => {
  // const options = interaction.options as discordjs.CommandInteractionOptionResolver

  interaction.reply('Pong! 🏓');
};

export const command: BaseCommand = {
  // data: new ContextMenuCommandBuilder()
  //   .setName('ping')
  //   .setType(ApplicationCommandType.Message),
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};
