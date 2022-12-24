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
      const command = client.interactions[interaction.commandName];
      if (!command)
        return interaction.followUp({
          content: 'An error has occured unfortunately ',
        });

      if (interaction.isContextMenuCommand()) {
        if (command) command.execute({ client, interaction });
      } else if (interaction.isCommand()) {
        console.log('Interaction Event', command);

        const args = [];
        for (let option of interaction.options.data) {
          if (option.type === ApplicationCommandOptionType.Subcommand) {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
            });
          } else if (option.value) args.push(option.value);
        }

        interaction.member = interaction?.guild?.members?.cache?.get(
          interaction.user.id
        ) as GuildMember;

        command.execute({ client, interaction, args });
      }
    }
  );
};
