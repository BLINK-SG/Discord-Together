const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "Get the bots ping",
    category: "info",
    botPermission: [],
    authorPermission: [],
    testOnly: false,
    ownerOnly: false,
    run: async (client, message, args) => {
        
        message.channel.send('Pinging...').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp

            m.edit(new MessageEmbed()
            .setDescription(`MessageEdit: ${ping}ms\nAPI: ${client.ws.ping}ms`)
            .setColor('GREEN')
            )
        })
    }
}
