import { Message } from "discord.js";

export default class {
  name = "";

  execute(msg: Message, ...args) {
    throw new TypeError("Not Implemented");
  }
}
