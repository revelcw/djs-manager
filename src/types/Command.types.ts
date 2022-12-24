import { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';

import { CommandProps } from './CommandProps.types';
import { Subcommands } from './Subcommands.types';

export type Command = {
  data:
    | Omit<
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
      >
    | ContextMenuCommandBuilder;
  execute: (commandProps: CommandProps) => Promise<void> | Promise<Subcommands>;
};
