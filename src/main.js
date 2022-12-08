import { readdirSync } from "fs";
import {
  Client,
  Collection,
  GatewayIntentBits,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  Events,
  InteractionType,
} from "discord.js";
import * as dotenv from "dotenv";
import { assert } from "console";
dotenv.config();

const token = process.env.TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
const commandFiles = readdirSync("./src/commands").filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}

client.once("ready", () => {
  console.log("Bot Ready!");
  client.user.setActivity("over the children", { type: "WATCHING" });
});

client.on(Events.InteractionCreate, async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    // await interaction.deferReply({ ephemeral: false }).catch(() => {});

    console.log(
      client.commands.get(interaction.commandName),
      interaction.commandName
    );
    const cmd = await client.commands.get(interaction.commandName);
    if (!cmd)
      return interaction.followUp({
        content: "An error has occured unfortunately ",
      });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.execute(client, interaction, args);
  }

  // Context Menu Handling
  // if (interaction.type == InteractionType.M) {
  //   await interaction.deferReply({ ephemeral: false });
  //   const command = client.slashCommands.get(interaction.commandName);
  //   if (command) command.run(client, interaction);
  // }
});

client.login(token);
