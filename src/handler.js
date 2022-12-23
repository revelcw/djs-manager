import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import Glob from "glob";
import { promisify } from "util";
import * as dotenv from "dotenv";
dotenv.config();

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;
const { glob } = Glob;
const globPromise = promisify(glob);

export default async (client) => {
  //Events
  const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
  eventFiles.forEach(async (value) => {
    const eventExport = await import(value);
    const event = eventExport.default;
    event(client);
  });

  // Slash Commands
  const interactionFiles = await globPromise(
    `${process.cwd()}/src/commands/*.js`
  );

  const interactions = await Promise.all(
    interactionFiles.map(async (interactionFile) => {
      const interactionExport = await import(interactionFile);
      const interaction = interactionExport.default;
      if (!interaction?.name) return;

      client.interactions.set(interaction.name, interaction);

      if (["MESSAGE", "USER"].includes(interaction.type))
        delete interaction.description;

      console.log("Interaction data: ", interaction.data);
      console.log("Interaction: ", interaction);
      // interaction.data.type
      return interaction.data.toJSON();
    })
  );

  // console.log(interactions);

  client.on("ready", async () => {
    // Register for a single guild
    await client.guilds.cache
      .get("939352044374999070")
      .commands.set(interactions);

    // Register for all the guilds the bot is in
    // await client.application.commands.set([]);
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
