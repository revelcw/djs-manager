const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const { CLIENT_ID, TOKEN } = process.env;

const commands = [];
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.js'));
console.log('Command Files:', commandFiles);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log('Command: ', command.data.name, ' found');
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
