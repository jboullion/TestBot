import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import { EventHandler } from "./handlers/event-handler.js";
import Deps from "./utils/deps.js";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

config({ path: ".env" });

// https://discord.com/developers/docs/topics/gateway#gateway-intents
export const bot = Deps.add(
  Client,
  new Client({ intents: [Intents.FLAGS.GUILDS] })
);

Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);

require("../dashboard/server");
