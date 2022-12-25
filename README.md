# DiscoTS: A Discord.JS Typescript Manager Template

> **⚠️ PROJECT CURRENTLY A WIP. From this point on, ~~all~~ *most* pushes to github will have no errors, but features are missing and everything is subject to change!**

If you're looking for a simple, stylish command manager that works in *both* JavaScript and TypeScript, DiscoTS is for you!

This template uses `npm` and compiles TypeScript to JavaScript. TypeScript is optional and JS works fine for any added files, but heavily reccomended as it will make development a lot easier.

## Todo

Note that all of these TODOs are all possible yourself by modifying the code, as DiscoTS is just a template. I have not gotten to doing it myself yet.

- [ ] Add applicaton (ie. not guild specific) command support (easy).
- [ ] Add some kind of cross-command data sharing.
- [ ] Support subcommand groups (Idk what that is. I'll need to do research.)

## Quick Example

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

---

## Features

### Slash Command Handling

DiscoTS automaticly loads your command files, registers them with Discord, and runs your function. You can also store data for a command that stays persistent at the top of the file.

### Subcommands

DiscoTS handles subcommands by allowing you to return functions that run when their corresponding subcommand was run in Discord. This lets you create subcommands easily. Because all of the subcommands are in the same file, you can access the same variables between subcommands.

<details open>
  <summary>TypeScript Example </summary>

The file for /count \<subcommand> command. Note that a command with subcommands cannot be run without a subcommand.

```ts
let count = 0; // Create static var outside of execute command.

const execute = async ({
  client,
  interaction,
}: ExecuteParams): Promise<Execute> => {
  console.log("A /count command has been run") // Runs on any subcommand.
  return {
    get: () => { // Runs on /count get subcommand.
      interaction.reply(`Current count is: ${count}`);
    },
    add: () => { // Runs on /count add subcommand.
      count += 1;
      interaction.reply('Counted +1!');
    },
  };
};

export const...
```

</details>

### Context Menu Interactions
  
  DiscoTS also has support for Context Menu interactions, both on users and messages. These menus are super simple to set up and are even easier than slash commands themselves. You can read more about these in the **TODO: wiki**

 <img width="720" alt="image" src="https://user-images.githubusercontent.com/29359616/209451809-55c1c76f-6345-447a-86a6-bbbae292e957.png">
  
### Events
  
  DiscoTS will loop through files under the `/events` folder and intialize them so you can set up any custom events you want, like when a message is sent or a user joins your server.
