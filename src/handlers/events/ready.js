import Event from "./event.js";
import { bot } from "../../bot.js";
import { CommandHandler } from "../command-handler.js";
import Deps from "../../utils/deps.js";
// import { MessageEmbed } from "discord.js";
// import { Tags } from "../../data/models/tag.js";
import { ChannelMessages } from "../../data/models/channel-messages.js";
import moment from "moment";


// const embed = new MessageEmbed()
// 	.setTitle('Some Title')
// 	.setColor('#0099ff');

export default class extends Event {
  on = "ready";

  constructor() {
    super();
    this.commandHandler = Deps.get(CommandHandler);
  }

  async invoke() {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity('Everything', { type: 'WATCHING'});

    ChannelMessages.sync({ force: true });

    const channel = bot.channels.cache.get("866066557331570710");
    channel.messages.fetch().then(async messages => {
      console.log(`${messages.size} messages.`);

      let finalArray = [];
  
      const putInArray = async (data) => finalArray.push(data);
      const handleTime = (timestamp) => moment(timestamp).format("YYYYMMDD - hh:mm:ss a").replace("pm", "PM").replace("am", "AM"); 
  
      for (const message of messages.array().reverse()) {
        if (!message.guild || message.author.bot) continue;

        await putInArray(`${handleTime(message.createdTimestamp)} ${message.author.username} : ${message.content}`);
      }
  
      console.log(finalArray);
      console.log(finalArray.length);
    })

    // const channel = bot.channels.cache.get('866066557331570708');
    // try {
    //   const webhooks = await channel.fetchWebhooks();
    //   const webhook = webhooks.first();

    //   await webhook.send({
    //     content: 'Webhook test',
    //     username: 'some-username',
    //     avatarURL: 'https://i.imgur.com/AfFp7pu.png',
    //     embeds: [embed],
    //   });
    // } catch (error) {
    //   console.error('Error trying to send a message: ', error);
    // }

    await this.commandHandler.init();
  }
}