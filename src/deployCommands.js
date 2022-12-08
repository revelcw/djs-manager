import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as dotenv from "dotenv";
dotenv.config();
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

export default async (client) => {
  //Events
  // const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  // eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(`${process.cwd()}/commands/*.js`);

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    // Register for a single guild
    await client.guilds.cache
      .get("939352044374999070")
      .commands.set(arrayOfSlashCommands);

    // Register for all the guilds the bot is in
    // await client.application.commands.set(arrayOfSlashCommands);
  });
};
// const commands = [];
// const commandFiles = readdirSync("./src/commands").filter((file) =>
//   file.endsWith(".js")
// );
// console.log("Command Files:", commandFiles);

// for (const file of commandFiles) {
//   const theFile = `./commands/${file}`;
//   console.log("Command: ", theFile, " found");
//   const command = await import(theFile);
//   commands.push(command.default.data.toJSON());
// }

// const rest = new REST({ version: "9" }).setToken(TOKEN);

// rest
//   .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
//   .then(() =>
//     console.log("Successfully registered guild application commands.")
//   )
//   .catch(console.error);
