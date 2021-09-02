import { Client, ClientOptions, Intents, WebSocketOptions } from "discord.js";
import { config } from "dotenv";
import { EventHandler } from "@handlers/event-handler";
import Deps from "@src/utils/deps";

config({ path: ".env" });

const webSocketOptions: WebSocketOptions = { intents: [Intents.FLAGS.GUILDS] };
const clientOptions: ClientOptions = { ws: webSocketOptions };

export const bot = Deps.add(Client, new Client(clientOptions));

Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);
