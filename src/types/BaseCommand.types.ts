import { SlashCommandBuilder } from 'discord.js';

import { CommandProps } from './CommandProps.types';

export type BaseCommand = {
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
  execute: (arg0: CommandProps) => Promise<void>;
};
