import Event from "./event.js";
import { CommandHandler } from "../command-handler.js";
import Deps from "../../utils/deps.js";
//import { Guilds } from "../../data/guilds.js";

import { ChannelMessage } from "../../data/models/channel-message.js";
import { Channel } from "../../data/models/channel.js";

import { sequelize } from '../../data/sequelize.js';
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

    try {
      // Track all messages on all channels. Make sure we create / find each channel in it's own table. Then, update the channel_messages table usage_count and date
      Channel.findOrCreate({
        where: { channel_id: msg.channel.id },
        defaults: {
          channel_id: msg.channel.id,
          name: msg.channel.name
        }
      })
      .then(async channel => {
        const date = moment().format("YYYY-MM-DD");
        const channelMessages = await ChannelMessage.findOne({ where: { channel_id: msg.channel.id, date: date } });
        
        if (channelMessages) {
          channelMessages.increment('usage_count');
        }else{
          ChannelMessage.create({
            channel_id: msg.channel.id
          });
        }
      })
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
