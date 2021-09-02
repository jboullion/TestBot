import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import { EventHandler } from "./handlers/event-handler.js";
import Deps from "./utils/deps.js";

config({ path: ".env" });

export const bot = Deps.add(
  Client,
  new Client({ intents: [Intents.FLAGS.GUILDS] })
);

Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);
