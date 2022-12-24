import {
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Interaction,
} from 'discord.js';
import { ExtendedClient } from './ExtendedClient.types';
import { ExtendedCommandInteraction } from './ExtendedCommandInteraction.types';

export type Execute = {
  client: ExtendedClient;
  interaction: ExtendedCommandInteraction;
  args: string[];
};
