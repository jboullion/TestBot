import { Client, Intents } from "discord.js";
import { config } from "dotenv";

config({ path: ".env" });

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.on("ready", () => console.log(bot.user.username + " is online"));
bot.on("message", async (msg) => {
  // Don't reply to bots
  if (msg.author.bot) return;

  await msg.reply("Hi");
});

bot.login(process.env.BOT_TOKEN);
