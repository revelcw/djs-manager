import * as discordjs from 'discord.js';
import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { BaseCommand } from '../types/BaseCommand.types';
import { CommandProps } from '../types/CommandProps.types';
import { GetSubcommands } from '../types/GetSubcommands.types';
import { SubcommandCommand } from '../types/SubcommandCommand.types';
dotenv.config();

const getSubcommands = async ({
  client,
  interaction,
}: CommandProps): Promise<GetSubcommands> => {
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

export const command: SubcommandCommand = {
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
  getSubcommands,
};
