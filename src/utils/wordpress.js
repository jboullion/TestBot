import axios from "axios";

export default class WordPress {

	/**
	 * POST a messages content to wordpress
	 * @param {Message} msg Discord Message
	 */
	static postAnnouncement(msg) {
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
	}
}