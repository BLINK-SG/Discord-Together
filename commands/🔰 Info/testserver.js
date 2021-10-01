const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "testserver",
  description: "Application for joinin testservs **JOINING TEST SERVERVER PROJECT WILL UNLOCK BETA FETURES FOR YOUR GUILD**",
  aliases: ["test", "register", "ts", "join"],
  run: async(bot, message, args) => {

if(!args[0])
{
  message.channel.send("Please Provide Me Servers Invite In Which You Want To Enable Test Fetures !!")
  return;
}
let args1 = args.join(' ');
const channel = bot.channels.cache.get("891938502529413140")
const embed = new MessageEmbed()
.setDescription(`**APPLICATION SUCCESFULL**\n USER : <@!${message.member.id}>\n OWNER : ${args1}\n GUild : ${message.guild.id}`)
channel.send(embed)
message.channel.send("> Done your application is subbmited make sure to join **SUPPORT-SERVER** for approval https://discord.gg/rp6xt4JPwu :)")
      
      

  }
}
module.exports.help = {
    name: "testserve",
    description: "Application for joining testservs **JOINING TEST SERVER PROJECT WILL UNLOCK BETA FETURES FOR YOUR GUILD**",
    usage: "bug-report",
    type: "Reports"  
}

