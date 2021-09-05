import Event from "./event.js";
import { CommandHandler } from "../command-handler.js";
import Deps from "../../utils/deps.js";
//import { Guilds } from "../../data/guilds.js";

import { ChannelMessage } from "../../data/models/channel-message.js";
import { Channel } from "../../data/models/channel.js";

import { sequelize } from '../../data/sequelize.js';
import moment from "moment";
import axios from "axios";


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
      const channel = await Channel.findOrCreate({
        where: { channel_id: msg.channel.id },
        defaults: {
          channel_id: msg.channel.id,
          name: msg.channel.name
        }
      });

      // INCREMENT our channel message count
      const channelMessages = await ChannelMessage.findOne({ where: { channel_id: msg.channel.id, date: date } });
      if (channelMessages) {
        channelMessages.increment('usage_count');
      }else{
        ChannelMessage.create({
          channel_id: msg.channel.id
        });
      }
      
      // POST this message to the wordpress site
      if(msg.channel.id === process.env.ANNOUNCEMENTS_ID){
        axios.post(`https://${process.env.WP_DOMAIN}/wp-json/wp/v2/posts`, 
          {
            title: msg.author.username,
            content: msg.content
          },
          {
            auth: {
              username: process.env.WP_USER,
              password: process.env.WP_PASSWORD
            }
          });
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
