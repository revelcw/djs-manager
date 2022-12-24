# Discord.JS Typescript Manager Template

> **⚠️ PROJECT CURRENTLY A WIP. From this point on, all pushes to github will have no errors, but features are missing and everything is subject to change!**

If you're looking for a command manager simple command manager that works in both JavaScript and TypeScript, this manager is for you!

This template uses `npm` and compiles TypeScript to JavaScript. TypeScript is optional and JS works fine for any added files, but heavily reccomended as it will make development a lot easier.

# Features

## Slash command handling.

Easy slash command handling and registering. 
<details open>
  <summary>TS</summary>

```ts
const execute = async ({
  client,
  interaction,
}: CommandProps): Promise<Execute> => {
  interaction.reply('Pong! 🏓');
};

export const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};
```

</details>

<details>
  <summary>JS</summary>
 
https://github.com/revelcw/djs-manager/blob/797bbf297b3fc0321d07def3dbd2cff064c16edb/src/commands/ping.js#L4-L11

</details>

