import {
  APIInteractionGuildMember,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from 'discord.js';

export interface ExtendedCommandInteraction extends CommandInteraction {
  options: CommandInteractionOptionResolver;
  member: GuildMember | APIInteractionGuildMember | null;
}
