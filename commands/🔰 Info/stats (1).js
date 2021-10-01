const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
mdur = require('moment-duration-format');
const moment = require("moment");
os = require('os'),

module.exports = {
    name: "stats",
    description: "Get information about the bot",
    
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
   run: async (client, message, args) => {
            const { version } = require("discord.js")
            cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");
            const cores = os.cpus().length
            const cpuModel = os.cpus()[0].model
           // const usage = formatBytes(process.memoryUsage().heapUsed)
            const CPU = percent.toFixed(2)

            const embed = new MessageEmbed()
            embed.setColor("RANDOM")
            embed.setTitle(`Stats from \`${client.user.username}\``)
            embed.addFields({
                name: ':ping_pong: Ping',
                value: `┕\`${Math.round(client.ws.ping)}ms\``,
                inline: true
            },
            {
                name: ':clock1: Uptime',
                value: `┕\`${duration}\``,
                inline: true
            },{
                name: ':file_cabinet: Memory',
                value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,
                inline: true
            })

            embed.addFields({
                name: ':homes: Servers',
                value: `┕\`${client.guilds.cache.size}\``,
                inline: true
            },
            {
                name: ':busts_in_silhouette: Users',
                value: `┕\`${client.users.cache.size}\``,
                inline: true
            },{
                name: ':control_knobs: API Latency',
                value: `┕\`${(message.client.ws.ping)}ms\``,
                inline: true
            },{
                name: ':snowflake: CPU',
                value: `┕\`${cpuModel}\``,
                inline: true
            },{
                name: ':gear: Cores',
                value: `┕\`${cores}\``,
                inline: true
            },{
                name: ':crystal_ball: Cpu Usage ',
                value: `┕\`${CPU}\``,
                inline: true
            })
            

        return message.channel.send(embed);
    })
}}