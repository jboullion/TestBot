import Sequelize from 'sequelize';
import { sequelize } from '../sequelize.js';

export const ChannelMessages = sequelize.define('channel_messages', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	last_message: {
		type: Sequelize.DATE
	},
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});