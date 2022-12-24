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
  interaction.member.send('Hi');
  interaction.reply({ content: 'Sent message.', ephemeral: true });
};

export const command: Command = {
  data: new ContextMenuCommandBuilder()
    .setName('Say Hi')
    .setType(ApplicationCommandType.User),
  execute,
};
