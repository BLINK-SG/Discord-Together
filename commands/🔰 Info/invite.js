const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Invite the bot to your server.",
 run: async(bot, message, args) => {

    let inviteEmbed = new MessageEmbed()
      .setTitle("Love using DISCORD-TOGETHER? Great, Thank you! Consider adding it to your server")
      .setColor("#F0EAD6")
      .setAuthor('DISCORD-TOGETHER','https://cdn.discordapp.com/attachments/881206856264056845/891938772839714846/1_vieC6TKbz9nCXVcWYWVDSA.png')
      
      .setThumbnail(message.guild.iconURL())
      .setDescription(" [**CLICK HERE**](https://discord.com/api/oauth2/authorize?client_id=891895400938750012&permissions=274881399872&scope=bot%20applications.commands) **TO INVITE ME**\n \n [**CLICK HERE**](https://discord.gg/rp6xt4JPwu) **TO JOIN SUPPORT SERVER**" , true)

    inviteEmbed.setTimestamp();

    return message.channel.send(inviteEmbed).catch(console.error);
  }
};