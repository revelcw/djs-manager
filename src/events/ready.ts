import { ActivityType, Events } from 'discord.js';
import { ExtendedClient } from '../types/ExtendedClient.types';

export const registerEvent = (client: ExtendedClient) => {
  client.once(Events.ClientReady, async () => {
    console.log('Bot Ready!');
    client?.user?.setActivity('over the children', {
      type: ActivityType.Watching,
    });
  });
};
