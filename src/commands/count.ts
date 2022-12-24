import Base from 'airtable/lib/base';
import * as discordjs from 'discord.js';
import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { Command } from '../types/Command.types';
import { ExecuteParams } from '../types/ExecuteParams';
import { Execute } from '../types/Execute.types';
import { Subcommands } from '../types/Subcommands.types';
dotenv.config();

let count = 0;

const execute = async ({ client, interaction }: ExecuteParams) => {
  return {
    get: () => {
      interaction.reply(`Current count is: ${count}`);
    },
    add: () => {
      count += 1;
      interaction.reply('Counted +1!');
    },
  };
};

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('count')
    .setDescription('Counting command.')
    .addSubcommand((subcommand) =>
      subcommand.setName('get').setDescription('Displays current count.')
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('add').setDescription('Adds one to the count.')
    ),
  execute,
};
