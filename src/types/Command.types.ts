import { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';

import { ExecuteParams } from './ExecuteParams';
import { Execute } from './Execute.types';

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
  execute: (commandProps: ExecuteParams) => Promise<Execute>;
};
