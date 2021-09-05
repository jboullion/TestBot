import Sequelize from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Channel = sequelize.define('channels', {
	channel_id: {
		type: Sequelize.STRING,
		unique: true,
	},
	name: {
		type: Sequelize.STRING,
	},
});