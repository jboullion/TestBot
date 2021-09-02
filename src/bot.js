import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import { EventHandler } from "./handlers/event-handler.js";

config({ path: ".env" });

export const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
new EventHandler().init();

bot.login(process.env.BOT_TOKEN);
