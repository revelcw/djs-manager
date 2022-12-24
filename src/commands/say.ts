import Base from 'airtable/lib/base';
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
import { Subcommands } from '../types/Subcommands.types';
dotenv.config();

const execute = async ({
  client,
  interaction,
}: CommandProps): Promise<Execute> => {
  // const options = interaction.options as discordjs.CommandInteractionOptionResolver
  console.log('Command name', interaction.options.getSubcommand());
  return {
    hi: () => {
      interaction.reply('HIII!');
    },
    bye: () => {
      interaction.reply('BYE! 👋');
    },
  };
};

export const command: Command = {
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
  execute,
};
