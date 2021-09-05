import Sequelize from 'sequelize';
import { sequelize } from '../sequelize.js';

export const ChannelMessages = sequelize.define('channel_messages', {
	channel_id: {
		type: Sequelize.STRING,
	},
	name: {
		type: Sequelize.STRING,
	},
	date: {
		type: Sequelize.DATEONLY,
		defaultValue: Sequelize.NOW,
	},
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
},
{
	indexes: [
		{
			unique: true,
			fields: ['id', 'date']
		}
	]
});