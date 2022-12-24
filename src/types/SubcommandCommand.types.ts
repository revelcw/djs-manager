import { SlashCommandBuilder } from 'discord.js';

import { CommandProps } from './CommandProps.types';
import { GetSubcommands } from './GetSubcommands.types';

export type SubcommandCommand = {
  data: Omit<
    SlashCommandBuilder,
    | 'addBooleanOption'
    | 'addUserOption'
    | 'addChannelOption'
    | 'addRoleOption'
    | 'addAttachmentOption'
    | 'addMentionableOption'
    | 'addStringOption'
    | 'addIntegerOption'
    | 'addNumberOption'
  >;
  getSubcommands: (arg0: CommandProps) => Promise<GetSubcommands>;
};
