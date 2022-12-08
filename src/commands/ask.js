import { SlashCommandBuilder, time } from "@discordjs/builders";
import * as discordjs from "discord.js";
import {
  ComponentType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { ChatGPTAPI } from "chatgpt";
import * as dotenv from "dotenv";
const { MessageEmbed } = discordjs;
dotenv.config();

const api = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN });

const ask = async (client, interaction) => {
  interaction.reply("hello");
  // const modal = new ModalBuilder()
  //   .setCustomId("reportUserModal")
  //   // .setTitle(`Report User: ${interaction.targetUser.tag}`)
  //   .setComponents(
  //     new ActionRowBuilder().setComponents(
  //       new TextInputBuilder()
  //         .setCustomId("reportMessage")
  //         .setLabel("Report Message")
  //         .setStyle(TextInputStyle.Paragraph)
  //         .setRequired(true)
  //         .setMinLength(10)
  //         .setMaxLength(500)
  //     )
  //   );

  // await interaction.showModal(modal);
  // const modalSubmitInteraction = await interaction.awaitModalSubmit({
  //   filter: (i) => {
  //     console.log("Await Modal Submit");
  //     console.log(i.fields);
  //     return true;
  //   },
  //   time: 120000, // 120 seconds = 120000 milliseconds, this is how long the user has to submit the modal before it errors. Use try / catch or .then().catch() to handle this.
  // });

  // modalSubmitInteraction.reply({
  //   content: `Thank you for reporting. Reason: ${modalSubmitInteraction.fields.getTextInputValue(
  //     "reportMessage"
  //   )}`,
  //   ephemeral: true,
  // });
};

export default {
  runnableIn: ["dm", "guild"],
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Asks the ChatGPC model a question.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Question to ask the ChatGPC model.")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    await ask(client, interaction);
  },
};
