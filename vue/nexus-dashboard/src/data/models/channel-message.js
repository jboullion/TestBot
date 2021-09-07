import Sequelize from 'sequelize';
import { sequelize } from '../sequelize.js';

export const ChannelMessage = sequelize.define('channel_messages', {
	channel_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	date: {
		type: Sequelize.DATEONLY,
		defaultValue: Sequelize.NOW,
		allowNull: false,
	},
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		allowNull: false,
	},
},
{
	indexes: [
		{
			unique: true,
			fields: ['channel_id', 'date']
		}
	]
});

export class ChannelMessages {
	/**
	 * FIND a channelMessages row for the specified date
	 * 
	 * @param {string} channelID The Discord Channel ID
	 * @param {string} date moment().format("YYYY-MM-DD")
	 * @returns sequelize ChannelMessage row
	 */
	static async findOne(channelID, date) {
		try {
			return await ChannelMessage.findOne({ where: { channel_id: channelID, date: date } });
		}catch(e){
			console.log('ChannelMessages findOne ', e);
		}

		return false;
	}

	/**
	 * INCREMENT / CREATE a channelMessages record
	 * 
	 * @param {Message} msg Discord Message object
	 * @param {string} date moment().format("YYYY-MM-DD")
	 */
	static async update(msg, date) {
		try {
			const channelMessages = await this.findOne(msg.channel.id, date);
			if (channelMessages) {
				channelMessages.increment('usage_count');
			}else{
				ChannelMessage.create({
					channel_id: msg.channel.id
				});
			}
			return true;
		}catch(e){
			console.log('ChannelMessages update ', e);
			return false;
		}
	}

}