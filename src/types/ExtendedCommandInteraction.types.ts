import {
  APIInteractionGuildMember,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from 'discord.js';

export type ExtendedCommandInteraction = CommandInteraction & {
  options: CommandInteractionOptionResolver;
  member: GuildMember | undefined;
};
