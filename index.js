const { Collection, Intents, Client, MessageEmbed } = require("discord.js");
const { token, mongoURL } = require('./config.json')
const mongoose = require('mongoose')
const express = require('express') ;
const app = express();
const fs = require("fs");
const keepAlive = require('./keepAlive.js');
require("./extended");


const client = new Client({
    
    partials: ["MESSAGE", "GUILD_MEMBER", "CHANNEL", "USER", "REACTION"],
    ws: {
        intents: Intents.ALL
    }
})



//mongo



mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb')
})

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from mongodb')
})

mongoose.connection.on('err', (err) => {
    console.log(`There was a error when connecting to mongodb\nError: ${err}`)
})



//command and events



client.commands = new Collection();
client.aliases = new Collection();
client.Timeout = new Collection();

["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});





client.login(process.env.TOKEN);