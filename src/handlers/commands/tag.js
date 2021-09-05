import Command from "./commands.js";

export default class extends Command {
  name = "tag";

  async execute(msg, tag, description) {
    console.log("Tag Test");

	console.log(msg);
	console.log(tag);
	console.log(description);
	

    // const tagName = msg.options.getString('name');
    // const tagDescription = msg.options.getString('description');

    // try {
    //   // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
    //   const tag = await Tags.create({
    //     name: tagName,
    //     description: tagDescription,
    //     username: msg.user.username,
    //   });
    //   return msg.reply(`Tag ${tag.name} added.`);
    // }
    // catch (error) {
    //   if (error.name === 'SequelizeUniqueConstraintError') {
    //     return msg.reply('That tag already exists.');
    //   }
    //   return msg.reply('Something went wrong with adding a tag.');
    // }
  }
}
