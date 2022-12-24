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
import { Subcommands } from '../types/Subcommands.types';

export const registerEvent = async (_client: any) => {
  console.log('Interaction Create Event Registed');
  _client.on(
    Events.InteractionCreate,
    async (interaction: ExtendedCommandInteraction) => {
      // Slash Command HandlinG
      const client = _client as ExtendedClient;
      const command = client.commands[interaction.commandName];
      if (!command)
        return interaction.followUp({
          content: 'An error has occured unfortunately ',
        });

      interaction.member = interaction?.guild?.members?.cache?.get(
        interaction.user.id
      ) as GuildMember;

      if (interaction.isContextMenuCommand() && command) {
        if (command) command.execute({ client, interaction });
      } else if (interaction.isCommand()) {
        if (interaction.options.getSubcommand(false)) {
          const subcommand: string = interaction.options.getSubcommand(
            false
          ) as string;
          const subcommands: Subcommands = (await command.execute({
            client,
            interaction,
          })) as Subcommands;
          subcommands[subcommand]();
        } else {
          await command.execute({ client, interaction });
        }
      }
    }
  );
};
