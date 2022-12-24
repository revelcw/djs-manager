import { BaseClient, Client } from 'discord.js';
import { Command } from './Command.types';

export type ExtendedClient = BaseClient &
  Client & {
    commands: Record<string, Command>;
  };
