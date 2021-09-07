import Sequelize from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Channel = sequelize.define('channels', {
	channel_id: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export class Channels {
	static async get(channelID) {
		return await Channel.findOne({ where: { channel_id: channelID } });
	}

	static async findOrCreate(msg) {
		return await Channel.findOrCreate({
			where: { channel_id: msg.channel.id },
			defaults: {
			  channel_id: msg.channel.id,
			  name: msg.channel.name
			}
		});
	}
}