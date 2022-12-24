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

      if (interaction.isContextMenuCommand()) {
        // On context menu
        command.execute({ client, interaction });
      } else if (interaction.isCommand()) {
        if (interaction.options.getSubcommand(false)) {
          // false means that it won't throw if interaction doesn't have subcommand
          const subcommand: string | null =
            interaction.options.getSubcommand(false);
          const subcommandExecutors: Subcommands = (await command.execute({
            client,
            interaction,
          })) as Subcommands; // also runs any code inside the execute function, this is intended

          if (subcommand && subcommandExecutors[subcommand]) {
            subcommandExecutors[subcommand]();
          }
        } else {
          await command.execute({ client, interaction });
        }
      }
    }
  );
};
