import { ContextMenuCommandBuilder, time } from "@discordjs/builders";
import * as discordjs from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import * as dotenv from "dotenv";
const { MessageEmbed } = discordjs;
dotenv.config();

const ask = async (client, interaction) => {
  interaction.reply("hello");
};

export default {
  name: "ping",
  description: "Pings the bot",
  type: "MESSAGE",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(client, interaction) {
    await ask(client, interaction);
  },
};
