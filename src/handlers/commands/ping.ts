import { Message } from "discord.js";
import Command from "./commands.js";

export default class extends Command {
  name = "ping";

  async execute(msg: Message) {
    await msg.reply("Pong!");
  }
}
