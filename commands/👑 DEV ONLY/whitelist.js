const blacklist = require('../../models/blacklist')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "whitelist",
    description: "Whitelist a blacklisted member",
    category: "owner",
    usage: "<member @ or id>",
    example: "@kyron",
    botPermission: [],
    authorPermission: [],
    ownerOnly: true,
    run: async (client, message, args) => {
        
        const User = message.mentions.members.first() || message.members.cache.get(args[0])

        if(!User) {
            return message.channel.send(new MessageEmbed().setDescription("Please specify a member for me to blacklist").setColor("RED"))
        }

        blacklist.findOne({ id: User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id: User.user.id })
               .catch(err => console.log(err))
               message.channel.send(new MessageEmbed().setDescription(`**${User.displayName}** is now whitelisted`).setColor("GREEN"))
            } else {
                return message.channel.send(new MessageEmbed().setDescription(`**${User.displayName}** is not blacklisted`).setColor("RED"))
            }
        })
    }
}
