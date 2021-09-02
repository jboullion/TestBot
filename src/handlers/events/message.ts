import Event from "./event.js";
import { CommandHandler } from "@handlers/command-handler.js";
import Deps from "@src/utils/deps.js";
import { Message } from "discord.js";

export default class extends Event {
  on = "message";

  constructor() {
    super();
    this.commandHandler = Deps.get(CommandHandler);
  }

  async invoke(msg: Message) {
    // Don't reply to bots
    if (!msg.guild || msg.author.bot) return;

    const prefix = ".";

    if (msg.content.startsWith(prefix)) {
      return this.commandHandler.handle(prefix, msg);
    }
  }
}
