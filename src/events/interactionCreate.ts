import {
  Client,
  Collection,
  GatewayIntentBits,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  Events,
  InteractionType,
  SnowflakeUtil,
  ApplicationCommandOptionType,
  ClientEvents,
  ClientApplication,
  Interaction,
  InteractionCollector,
  GuildMember,
} from 'discord.js';
import { ExtendedClient } from '../types/ExtendedClient.types';
import { ExtendedCommandInteraction } from '../types/ExtendedCommandInteraction.types';

export const registerEvent = async (client: any) => {
  console.log('Interaction Create Event Registed');
  client.on(
    Events.InteractionCreate,
    async (interaction: ExtendedCommandInteraction) => {
      // Slash Command HandlinG
      const command = client.commands[interaction.commandName];
      if (!command)
        return interaction.followUp({
          content: 'An error has occured unfortunately ',
        });

      interaction.member = interaction?.guild?.members?.cache?.get(
        interaction.user.id
      ) as GuildMember;

      if (interaction.isContextMenuCommand()) {
        if (command) command.execute({ client, interaction });
      } else if (interaction.isCommand()) {
        if (!interaction.options.getSubcommand(false)) {
          await command.execute({ client, interaction });
        } else {
          await command.getSubcommands();
        }
      }
    }
  );
};
