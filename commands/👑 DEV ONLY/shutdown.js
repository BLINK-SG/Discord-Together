module.exports = {
    name: "shutdown",
    description: "Shut down the discord bot",
    category: "owner",
    usage: "",
    example: "",
    botPermission: [],
    authorPermission: [],
    ownerOnly: true,
    run: async (client, message, args) => {
        process.exit(1);
    }
}
