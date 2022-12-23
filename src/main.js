import { readdirSync } from "fs";
import {
  Client,
  Collection,
  GatewayIntentBits,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  Events,
  InteractionType,
} from "discord.js";
import * as dotenv from "dotenv";
import { assert } from "console";
import handler from "./handler.js";
dotenv.config();

const token = process.env.TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.interactions = new Collection();

await handler(client);

client.once("ready", () => {
  console.log("Bot Ready!");
  client.user.setActivity("over the children", { type: "WATCHING" });
});

client.login(token);
