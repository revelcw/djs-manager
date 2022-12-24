import { Client } from 'discord.js';

export type ExtendedClient = Client & {
  interactions: Record<string, any>;
};
