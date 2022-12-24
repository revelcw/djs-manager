import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import Glob from 'glob';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import { SlashCommandBuilder } from 'discord.js';
dotenv.config();

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;
const { glob } = Glob;
const globPromise = promisify(glob);

export const register = async (client) => {
  //Events
  const eventFiles = await globPromise(`${process.cwd()}/dist/events/*.js`);
  eventFiles.forEach(async (value) => {
    const { registerEvent } = await import(value);
    registerEvent(client);
  });

  // App/Guild Commands & Menus
  const commandFiles = await globPromise(`${process.cwd()}/dist/commands/*.js`);

  console.log('Cwd', process.cwd());

  const commands = await Promise.all(
    commandFiles.map(async (commandFilename) => {
      const { command } = await import(commandFilename);
      const commandData = command?.data;
      if (!commandData?.name) return;

      client.interactions[commandData.name] = command;

      console.log('Interaction data: ', commandData);
      console.log('Interaction: ', command);
      // data.type
      return commandData.toJSON();
    })
  );

  client.on('ready', async () => {
    // Register for a single guild
    await client.guilds.cache.get(GUILD_ID).commands.set(commands);

    // Register for all the guilds the bot is in
    // await client.application.commands.set([]);
  });
};
