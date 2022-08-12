const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

const token = process.env.TOKEN;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.commands = new Collection();
const commandFiles = fs
  .readdirSync(__dirname + "/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(__dirname + `/commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Bot Ready!");
  client.user.setActivity("over the children", { type: "WATCHING" });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  console.log(interaction.channel);
  console.log("Interaction:", interaction);
  const inDms = interaction.guild === null;

  if (
    (inDms && command.runnableIn.includes("dm")) ||
    (!inDms && command.runnableIn.includes("guild"))
  ) {
    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  } else {
    console.log(command.runnableIn);
    return interaction.reply({
      content: `This command can only be run in a ${command.runnableIn.join(
        " or "
      )} channel!`,
      ephemeral: true,
    });
  }
});

client.login(token);

