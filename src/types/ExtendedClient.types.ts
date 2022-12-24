import { Client } from 'discord.js';
import { Command } from './Command.types';

export type ExtendedClient = Client & {
  commands: Record<string, Command>;
};
