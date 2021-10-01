const { MessageEmbed } = require('discord.js')
const { inspect } = require("util")

module.exports = {
    name: "eval",
    description: "Eval javascript code",
    category: "owner",
    botPermission: [],
    authorPermission: [],
    ownerOnly: true,
    run: async (client, message, args) => {

        const text = args.join(" ")
        
        if(!text) return message.channel.send("`❌ An error occurred while executing this command` `Error: Plesae specify something to eval`")

        try {
          const evaled = eval(text)
    
          var embed = new MessageEmbed()
          .setColor(0xfcfcfc)
          .setTitle("Evaluated")
          .addField("📥 Input", `\`\`\`${text}\`\`\``) 
          .addField("📤 Output", `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
          .addField("Type", `\`\`\`${typeof(evaled)}\`\`\``)
          .setTimestamp()
          .setFooter(`Evaluated in ${client.ws.ping}ms`)
          message.channel.send(embed)
    
          } catch (error) {
            var embed = new MessageEmbed()
            .setColor(0xd62424)
            .setTitle("❌ Error")
            .setDescription(`${error}`)
            message.channel.send(embed)
          }
    }
}
