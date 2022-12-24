import { readdirSync } from 'fs';
import {
  Client,
  Collection,
  GatewayIntentBits,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  Events,
  InteractionType,
  ActivityType,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { assert } from 'console';
import { register } from './register.js';
import { ExtendedClient } from './types/ExtendedClient.types.js';
dotenv.config();

const main = async () => {
  const token = process.env.TOKEN;

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  }) as ExtendedClient;

  client.commands = {};

  await register(client);

  client.once('ready', () => {
    console.log('Bot Ready!');
    client?.user?.setActivity('over the children', {
      type: ActivityType.Watching,
    });
  });

  client.login(token);
};

main();
