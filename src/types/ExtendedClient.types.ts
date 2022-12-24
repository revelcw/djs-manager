import { Client } from 'discord.js';
import { BaseCommand } from './BaseCommand.types';
import { SubcommandCommand } from './SubcommandCommand.types';

export type ExtendedClient = Client & {
  commands: Record<string, BaseCommand | SubcommandCommand>;
};
