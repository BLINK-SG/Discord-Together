const { MessageEmbed } = require('discord.js')
const prefixSchema = require('../../models/prefix')
const { default_prefix } = require('../../config.json')
const { readdirSync } = require("fs");
const ms = require('ms')

module.exports = {
    name: "help",
    description: "A help command",
	category: "info",
    botPermission: [""],
	guildOnly: true,
    authorPermission: [],
	cooldown: "5s",
    ownerOnly: false,
    run: async (client, message, args) => {

        const data = await prefixSchema.findOne({
            GuildID: message.guild.id
		});

		let prefix = default_prefix

		if(data) {
			prefix = data.Prefix
		}

		const roleColor =
		message.guild.me.displayHexColor === "#000000"
		  ? "#ffffff"
		  : message.guild.me.displayHexColor;
  
	  if (!args[0]) {
		let categories = [];
  
		readdirSync("./commands/").forEach((dir) => {
		  const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
			file.endsWith(".js")
		  );
  
		  const cmds = commands.map((command) => {
			let file = require(`../../commands/${dir}/${command}`);
  
			if (!file.name) return "No command name.";
  
			let name = file.name.replace(".js", "");
  
			return `\`${name}\``;
		  });
  
		  let data = new Object();
  
		  data = {
			name: dir.toUpperCase(),
			value: cmds.length === 0 ? "In progress." : cmds.join(" "),
		  };
  
		  categories.push(data);
		});
  
		const embed = new MessageEmbed()
		  .setTitle("📬 Need help? Here are all of my commands:")
		  .addFields(categories)
		  .setDescription(
			`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ping\`.\n\n`
		  )
		  .setFooter(
			`Requested by ${message.author.tag}`,
			message.author.displayAvatarURL({ dynamic: true })
		  )
		  .setTimestamp()
		  .setColor(roleColor);
		return message.channel.send(embed);
	  } else {
		const command =
		  client.commands.get(args[0].toLowerCase()) ||
		  client.commands.find(
			(c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
		  );
  
		if (!command) {
		  const embed = new MessageEmbed()
			.setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
			.setColor("FF0000");
		  return message.channel.send(embed);
		}
  
		const embed = new MessageEmbed()
		  .setTitle("Command Details:")
		  .addField("PREFIX:", `\`${prefix}\``)
		  .addField(
			"COMMAND:",
			command.name ? `\`${command.name}\`` : "No name for this command."
		  )
		  .addField(
			"ALIASES:",
			command.aliases
			  ? `\`${command.aliases.join("` `")}\``
			  : "No aliases for this command."
		  )
		  .addField(
			"USAGE:",
			command.usage
			  ? `\`${prefix}${command.name} ${command.usage}\``
			  : `\`${prefix}${command.name}\``
		  )
		  .addField(
			"DESCRIPTION:",
			command.description
			  ? command.description
			  : "No description for this command."
		  )
		  .addField(
			  "EXAMPLE",
			  command.example
			  ? `\`${prefix}${command.name} ${command.example}\``
			  : `\`${prefix}${command.name}\``
		  )
		  .setFooter(
			`Requested by ${message.author.tag}`,
			message.author.displayAvatarURL({ dynamic: true })
		  )
		  .setTimestamp()
		  .setColor(roleColor);
		return message.channel.send(embed);
	  }
    }
}
