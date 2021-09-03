import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import { EventHandler } from "./handlers/event-handler.js";
import Deps from "./utils/deps.js";
import mongoose from "mongoose";

config({ path: ".env" });

export const bot = Deps.add(
  Client,
  new Client({ intents: [Intents.FLAGS.GUILDS] })
);

mongoose.connect(process.env.MONGO_URI, (error) =>
  error
    ? console.log("Failed MongoDB connection")
    : console.log("Connected to MongoDB")
);

Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);
