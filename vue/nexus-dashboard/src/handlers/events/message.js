import Event from "./event.js";
import { CommandHandler } from "../command-handler.js";
import Deps from "../../utils/deps.js";
import WordPress from "../../utils/wordpress.js";

import { ChannelMessages } from "../../data/models/channel-message.js";
import { Channels } from "../../data/models/channel.js";

import moment from "moment";



export default class extends Event {
  on = "message";

  constructor() {
    super();
    this.commandHandler = Deps.get(CommandHandler);
    //this.guilds = Deps.get(Guilds);
  }

  async invoke(msg) {
    // Don't reply to bots
    if (!msg.guild || msg.author.bot) return;

    const date = moment().format("YYYY-MM-DD");

    try {
      // CREATE / FIND channel
      await Channels.findOrCreate(msg);

      // INCREMENT our channel message count
      await ChannelMessages.update(msg, date);

      // POST this message to the wordpress site
      if(msg.channel.id === process.env.ANNOUNCEMENTS_ID){
        WordPress.postAnnouncement(msg);
      }

    }catch(e) {
      console.log(e);
    }

    //const savedGuild = await this.guilds.get(msg.guild.id);
    const prefix = '.';//savedGuild.prefix;

    if (msg.content.startsWith(prefix)) {
      return this.commandHandler.handle(prefix, msg);
    }
  }
}
