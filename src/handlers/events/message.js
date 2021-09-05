import Event from "./event.js";
import { CommandHandler } from "../command-handler.js";
import Deps from "../../utils/deps.js";
//import { Guilds } from "../../data/guilds.js";
import { ChannelMessages } from "../../data/models/channel-messages.js";
import { sequelize } from '../../data/sequelize.js';

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

    const channel = await ChannelMessages.findOne({ where: { name: msg.channel.name } });
    
    if (channel) {
      console.log('updating channel: '+msg.channel.name);
      channel.update({
        last_message: sequelize.literal('CURRENT_TIMESTAMP'),
        usage_count: sequelize.literal('usage_count + 1')
      });
      //channel.increment('usage_count');
    }else{
      console.log('creating channel: '+msg.channel.name);
      const channel = await ChannelMessages.create({
        name: msg.channel.name,
        last_message: sequelize.literal('CURRENT_TIMESTAMP'),
        usage_count: 1,
      });
    }

    //const savedGuild = await this.guilds.get(msg.guild.id);
    const prefix = '.';//savedGuild.prefix;

    if (msg.content.startsWith(prefix)) {
      return this.commandHandler.handle(prefix, msg);
    }
  }
}
