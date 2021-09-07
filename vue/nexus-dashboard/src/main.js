import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import { EventHandler } from "./handlers/event-handler.js";
import Deps from "./utils/deps.js";

config({ path: ".env" });

// https://discord.com/developers/docs/topics/gateway#gateway-intents
export const bot = Deps.add(
  Client,
  new Client({ intents: [Intents.FLAGS.GUILDS] })
);

Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);
