import * as discordjs from 'discord.js';
import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { Execute } from '../types/Execute.types';
dotenv.config();

const getSubcommands = async ({ client, interaction }: Execute) => {
  // const options = interaction.options as discordjs.CommandInteractionOptionResolver
  console.log('Command name', interaction.options.getSubcommand());

  interaction.reply('Pong! 🏓');

  return {
    hi: () => {
      interaction.reply('HIII!');
    },
    bye: () => {
      interaction.reply('BYE! 👋');
    },
  };
};

export const command = {
  // data: new ContextMenuCommandBuilder()
  //   .setName('ping')
  //   .setType(ApplicationCommandType.Message),
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Says back')
    .addSubcommand((subcommand) =>
      subcommand.setName('hi').setDescription('says hi')
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('bye').setDescription('says bye')
    ),
  subcommands: getSubcommands,
};
