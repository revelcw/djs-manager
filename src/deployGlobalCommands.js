import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as dotenv from "dotenv";
dotenv.config();
const { CLIENT_ID, TOKEN } = process.env;

const commands = [];
const commandFiles = readdirSync("./src/commands").filter((file) =>
  file.endsWith(".js")
);
console.log("Command Files:", commandFiles);

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  console.log("Command: ", command.default.data.name, " found");
  commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(TOKEN);

rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
