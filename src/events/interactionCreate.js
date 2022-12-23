import {
  Client,
  Collection,
  GatewayIntentBits,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  Events,
  InteractionType,
  SnowflakeUtil,
} from "discord.js";

export default async (client) => {
  console.log("Interaction Create Event Registed");
  client.on(Events.InteractionCreate, async (interaction) => {
    // Slash Command Handling

    if (interaction.isContextMenuCommand()) {
      console.log("Its a context menu!");
      const command = client.interactions.get(interaction.commandName);
      console.log("Context Command:", interaction);
      if (command) command.execute(client, interaction);
    } else if (interaction.isCommand()) {
      console.log(
        "Interaction Event",
        client.interactions.get(interaction.commandName)
      );
      const cmd = await client.interactions.get(interaction.commandName);
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
  });
};
