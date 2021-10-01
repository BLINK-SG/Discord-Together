const {
	default_prefix, owners, TestServers
} = require('../config.json');
const {
	MessageEmbed,
  Collection
} = require('discord.js')
const prefixSchema = require('../models/prefix');
const schema = require('../models/custom-command')
const blacklist = require('../models/blacklist')
const db = require('../models/commands')
const ms = require('ms');
const Timeout = new Collection();


module.exports.run = async(client, message) => {



	if(message.author.bot) return;
	if(!message.guild) return;



	const data = await prefixSchema.findOne({
		GuildID: message.guild.id
	});

	let prefix = default_prefix

	if(data) {
		prefix = data.Prefix
	}



	if(!message.content.startsWith(prefix)) return;
	blacklist.findOne({
		id: message.author.id
	}, async(err, data) => {
		if(err) throw err;
		if(!data) {
			if(!message.member) message.member = await message.guild.members.fetch(message);
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const cmd = args.shift().toLowerCase();
			const cc = await schema.findOne({
				Guild: message.guild.id,
				Command: cmd
			})



			if(cc) {
				message.channel.send(cc.Response)
			}



			if(cmd.length === 0) return;
			let command = client.commands.get(cmd);
			if(!command) command = client.commands.get(client.aliases.get(cmd));
			if(!command) return;



			if(command.botPermission) {
				let neededPerms = [];
				command.botPermission.forEach(p => {
					if(!message.guild.me.hasPermission(p)) neededPerms.push('`' + p + '`');
				});
				const botpermsembed = new MessageEmbed().setDescription(`I need ${neededPerms.join(', ')} permission(s) to run this command!`).setColor('RED')
				if(neededPerms.length) return message.channel.send(botpermsembed);
			}



			if(command.authorPermission) {
				let neededPerms = [];
				command.authorPermission.forEach(p => {
					if(!message.member.hasPermission(p)) neededPerms.push('`' + p + '`');
				});
				const userpermsembed = new MessageEmbed().setDescription(`You need ${neededPerms.join(', ')} permission(s) to run this command!`).setColor('RED')
				if(neededPerms.length) return message.channel.send(userpermsembed);
			}



			if(command.guildOnly) {
				if(message.channel.type === "dm") {
					return message.author.send(new MessageEmbed().setDescription("Sorry but this command can only be executed is servers").setColor("RED"))
					.catch((e) => {})
					
				}
			}

			if(command.testOnly) {
				if(!TestServers.includes(message.guild.id)) {
					return message.channel.send(new MessageEmbed().setDescription("Sorry but this command can only be ran in the test servers").setColor("RED"))
				}
			}



			if(command.ownerOnly) {
				const owneronlyembed = new MessageEmbed().setDescription('This command can only be used by the bot owner')
				if(!owners.includes(message.author.id)) return message.channel.send(owneronlyembed);
			}



			if(command.cooldown) {
				let timeout = ms(command.cooldown)
				if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(new MessageEmbed().setDescription(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` cooldown`).setColor("RED"))
				Timeout.set(`${command.name}${message.author.id}`, Date.now() + timeout)
				setTimeout(() => {
					Timeout.delete(`${command.name}${message.author.id}`)
				}, timeout)
			}


			if(args.length < command.minArgs || (
				command.maxArgs !== null && args.length > command.maxArgs
			)) {
				if(command.usage) {
					return message.channel.send(new MessageEmbed().setDescription(`Incorrect syntax! Use ${prefix}${command.name} ${command.usage}`).setColor("RED"))
				} else {
					return message.channel.send(new MessageEmbed().setDescription(`Incorrect syntax! Use ${prefix}${command.name}`).setColor("RED"))
				}
			}



			if(command) {
				const check = await db.findOne({
					Guild: message.guild.id
				})
				if(check) {
					if(check.Cmds.includes(command.name)) return message.channel.send(new MessageEmbed().setDescription(`This command is disabled`).setColor("RED"))
					command.run(client, message, args)
				} else {
					command.run(client, message, args);
				}
			}
			} else {
				return message.channel.send(new MessageEmbed().setDescription("You are blacklisted from using this bot").setColor("RED"))
			}
			})
			client.on("message", async message => {
				if (message.content.toLowerCase() === ">crime") {
			  
					 
					let user = message.author;
				  let author = await db.fetch(`money_${user.id}`)
				if (author < 250) {
						return message.channel.send('You need at least 250 Coins to commit a crime')
					}
			  
			  
			  
				let timeout = 60000;
				let rand = Math.round(Math.random() * 700 + 200);
			  
			  
				let beg = await db.fetch(`crime_${user.id}`);
			  
				if (beg !== null && timeout - (Date.now() - beg) > 0) {
				  let time = ms(timeout - (Date.now() - beg));
				
			   let embedPop = new Discord.MessageEmbed()
			   .setTitle("Woaaaahh, Hold Your Cats")
			   .setDescription(`You've already done a crime recently! Use this command again in \n **${time.seconds}**s`)
			   .setColor("RED")
				   message.inlineReply({
				embed: embedPop,
				allowedMentions: { repliedUser: false }
			  });
				} else {
				  
					 let crimes = ["You beat up an old lady and manage to steal","You steal a car and then sold it for","You go into the pop cat HQ and you found","You didn't manage to do anything, but I give you a gift of","You are a genius, and managed to quickly grab someone's purse and run away. In it you found", "You ransacked your manager's home, found his prized alarm clock, and sold it for", `You sell a truckload of stolen goods and the former president's suit for `]
					let randomized = (crimes[Math.floor(Math.random() * crimes.length)])
				  let embedCrime = new Discord.MessageEmbed()
				  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
				  .setDescription(`${randomized} **${rand}** Coins`)
				  .setColor("GREEN")
				  .setFooter('Good!')
				 
						message.inlineReply({
				embed: embedCrime,
				allowedMentions: { repliedUser: false }
			  });
				db.add(`money_${user.id}`, rand)
				db.set(`crime_${user.id}`, Date.now())
			  
				   }
				}
				
			  
				
					 
				   
			  if (message.content.toLowerCase() === ">use cat") {
				 let rand = Math.round(Math.random() * 5 + 1);
			  let timeout = 86400000;
			  let amount = 1000;
				let user = message.author;
			  let pop = await db.fetch(`cat_${user.id}`)
				if (pop !== null && timeout - (Date.now() - pop) > 0) {
				  let time = ms(timeout - (Date.now() - pop));
				
			   message.inlineReply(`Don't Try To Be Greedy. Your Cat Will Only Bless You Once A Day! Please come back in **${time.hours}**h **${time.minutes}**m **${time.seconds}**s`, { allowedMentions: { repliedUser: false } })
				} else {
			  
			  let embed = new Discord.MessageEmbed()
			  .setTitle('Success')
			  .setDescription(`You Pat Your Cat, And It Blesses You With **1000** Coins`)
			  .setColor("GREEN")
			  .setFooter(`Cat Owner: ${message.author.tag}`)
				
				let pop = await db.fetch(`cat_${user.id}`)
				if(pop === null) return message.inlineReply("You need to buy a Cat from the shop!")
				if(pop > 0) message.channel.send(embed)
				 db.add(`money_${user.id}`, amount)
				 db.set(`cat_${user.id}`, Date.now())
				}
			  }
			   if (message.content.toLowerCase() === ">use mansion") {
				 let timeout = 604800000;
				let rand = Math.round(Math.random() * 30000 + 2000);
				let user = message.author;
			  let house = await db.fetch(`house_${user.id}`)
				if (house !== null && timeout - (Date.now() - house) > 0) {
				  let time = ms(timeout - (Date.now() - house));
				
			   message.inlineReply(`You Can Only Collect Rent From The Tenants Once A Week!\n Try again in **${time.days}**d **${time.hours}**h **${time.minutes}**m **${time.seconds}**s`, { allowedMentions: { repliedUser: false } })
				} else {
			  let embed = new Discord.MessageEmbed()
			  .setTitle('Payment Success')
			  .setDescription(`Your Tenant Payed You A Rent of ${rand} Coins`)
			  .setColor("GREEN")
			  .setFooter(`Mansion Owner: ${message.author.tag}`)
				let house = await db.fetch(`house_${user.id}`)
				if(house === null) return message.inlineReply("You need to buy a Mansion first!")
				if(house > 0) message.inlineReply({
				embed: embed,
				allowedMentions: { repliedUser: false }
			  });
				 db.add(`money_${user.id}`, rand)
				 db.set(`house_${user.id}`, Date.now())
			  
			  
			  } 
			  }
			  
			  if (message.content.toLowerCase() === ">use car") {
				 let rand = Math.round(Math.random() * 9000 + 1000);
				let user = message.author;
				 let timeout = 43200000;
			   
			  
			  
				let happi = await db.fetch(`happi_${user.id}`);
				if (happi === null) happi = 0;
			  
				if (happi !== null && timeout - (Date.now() - happi) > 0) {
				  let time = ms(timeout - (Date.now() - happi));
			  
			  let embed0 = new Discord.MessageEmbed()
			  .setTitle("Slow Down...")
			  .setDescription(`You can't be on the road all day! Go on a drive again in\n**${time.hours}**h **${time.minutes}**m **${time.seconds}**s`)
			  .setColor("RED")
			  message.inlineReply({
				embed: embed0,
				allowedMentions: { repliedUser: false }
			  });
				} else {
			  let embed1 = new Discord.MessageEmbed()
			  .setTitle('Success')
			  .setDescription(`You Went On A Drive With Your Dog, Earning ${rand} Coins `)
			  .setColor("GREEN")
			  .setFooter(`Car Owner: ${message.author.tag}`)
				let car = await db.fetch(`car_${user.id}`)
				if(car === null) return message.inlineReply("You need to buy a **Car** from the store first!")
				if(car > 0) message.inlineReply({
				embed: embed1,
				allowedMentions: { repliedUser: false }
			  });
				 db.add(`money_${user.id}`, rand)
				 db.set(`happi_${user.id}`, Date.now())
			  }
			  }
			  })
							
}