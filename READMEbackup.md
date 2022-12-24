# DiscoTS: A Discord.JS Typescript Manager Template

> **⚠️ PROJECT CURRENTLY A WIP. From this point on, ~~all~~ *most* pushes to github will have no errors, but features are missing and everything is subject to change!**

If you're looking for a simple, stylish command manager that works in *both* JavaScript and TypeScript, DiscoTS is for you!

This template uses `npm` and compiles TypeScript to JavaScript. TypeScript is optional and JS works fine for any added files, but heavily reccomended as it will make development a lot easier.

## Todo

Note that all of these TODOs are all possible yourself by modifying the code, as DiscoTS is just a template. I have not gotten to doing it myself yet.

- [ ] Add applicaton (ie. not guild specific) command support (easy).
- [ ] Add some kind of cross-command data sharing.
- [ ] Support subcommand groups (Idk what that is. I'll need to do research.)

## Features

### Slash Command Handling

DiscoTS automaticly loads your command files, registers them with Discord, and runs your function.

<details open>
  <summary>TypeScript</summary>

```ts
const execute = async ({
  client,
  interaction,
}: ExecuteParams): Promise<Execute> => {
  interaction.reply('Pong! 🏓');
};

export const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};
```

</details>

<details>
  <summary>JavaScript</summary>

```js
const execute = async ({ client, interaction }) => {
  interaction.reply('Pong! 🏓');
};

export const command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Says pong'),
  execute,
};

```

</details>
<hr/>

### Subcommands

DiscoTS handles subcommands by allowing you to return functions that run when their corresponding subcommand was run in Discord. This lets you create subcommands easily. You can also create variables and data only once and share it between subcommands, because they're all in the same file.

<details open>
  <summary>TypeScript</summary>

```ts
let count = 0;

const execute = async ({
  client,
  interaction,
}: ExecuteParams): Promise<Execute> => {
  return {
    get: () => {
      interaction.reply(`Current count is: ${count}`);
    },
    add: () => {
      count += 1;
      interaction.reply('Counted +1!');
    },
  };
};

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('count')
    .setDescription('Counting command.')
    .addSubcommand((subcommand) =>
      subcommand.setName('get').setDescription('Displays current count.')
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('add').setDescription('Adds one to the count.')
    ),
  execute,
};
```

</details>
