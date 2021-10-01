const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Guild: String,
    Cmds: Array
})

module.exports = mongoose.model('cmds', Schema)