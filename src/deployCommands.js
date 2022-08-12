const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

console.log(__dirname)
const commands = [];
const commandFiles = fs
  .readdirSync(__dirname + '/commands')
  .filter((file) => file.endsWith('.js'));
console.log('Command Files:', commandFiles);

for (const file of commandFiles) {
  const theFile = __dirname+ `/commands/${file}`;
  console.log('Command: ', theFile, ' found');
  const command = require(theFile);
  console.log('Command: ', command.data.name, ' found');
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() =>
    console.log('Successfully registered guild application commands.')
  )
  .catch(console.error);
