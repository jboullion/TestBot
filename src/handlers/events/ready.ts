import Event from "@events/event.js";
import { bot } from "@src/index.js";
import { CommandHandler } from "@handlers/command-handler.js";
import Deps from "@src/utils/deps.js";

export default class extends Event {
  on = "ready";

  constructor() {
    super();
    this.commandHandler = Deps.get(CommandHandler);
  }

  async invoke() {
    console.log(`${bot.user.username} is online`);

    await this.commandHandler.init();
  }
}
