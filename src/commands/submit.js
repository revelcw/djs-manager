const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();
var Airtable = require("airtable");

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, GUILD_ID } = process.env;

var base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// const roles = {
//   custom_hard: "Hard",
//   custom_expert: "Expert",
//   custom_expert_plus: "Expert+",
//   normal_hard: "Hard",
//   normal_expert: "Expert",
//   normal_expert_plus: "Expert+",
// }

const roles = {
  "959547297719541800": "custom_hard",
  "959547348793589791": "normal_hard",
};

const getBracket = (member) => {
  const role = Object.keys(roles).find((key) => member.roles.cache.has(key));
  return roles[role];
};

const getPreviousRecords = async (db, interaction) => {
  const previousRecords = await db("Submissions")
  .select({
    view: "Grid view",
    filterByFormula: `{DiscordId} = "${interaction.user.id}"`,
  })
  .all();
  return previousRecords;
}

const submit = async (interaction, client) => {
  const guild = client.guilds.cache.get(GUILD_ID);
  const member = guild.members.cache.get(interaction.user.id);

  const previousRecords = await getPreviousRecords(base, interaction);

  if (previousRecords.length < 1) {
    const bracket = getBracket(member);

    const memberBracket = bracket ?? "none";

    const messageEmbed = new MessageEmbed()
      .setTitle("Your interaction")
      .addFields(
        {
          name: "Username",
          value: `<@${interaction.user.id}>`,
          inline: true,
        },
        {
          name: "Bracket",
          value: memberBracket,
          inline: true,
        }
      );

    interaction.reply({ embeds: [messageEmbed] });
    base("Submissions").create(
      [
        {
          fields: {
            DiscordName: interaction.user.username,
            DiscordId: interaction.user.id,
            Bracket: bracket,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          interaction.reply(
            "There was an error saving your submission, please contact a server admin."
          );
          return;
        }
      }
    );
  } else {
    interaction.reply({
      content:
        "You have already submitted a playthrough. If you think this is a mistake, please contact a server admin",
      ephemeral: true,
    });
  }
};

module.exports = {
  runnableIn: ["dm", "guild"],
  data: new SlashCommandBuilder()
    .setName("submit")
    .setDescription("Makes a silly face!")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("The link to the playthrough video.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    await submit(interaction, client);
  },
};
