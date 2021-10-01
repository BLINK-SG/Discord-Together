const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    id: String
})

module.exports = mongoose.model('blacklist', blacklistSchema)