module.exports.run = (client) => {
   
    console.log("---------------------");
    console.log("UwU Blink OP 😊");
    console.log("---------------------");

    client.user.setActivity("dt!", {
        type:"STREAMING",
        url: "https://www.twitch.tv/nocopyrightsounds"
    });


    

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "hello",
            description: "A hello command",

            options: [
                {
                    name: "content",
                    description: "idk",
                    type: 3,
                    required: false
                }
            ]
        }
    })


    
    client.ws.on('INTERACTION_CREATE', async(interaction) => {
        const command = interaction.data.name.toLowerCase()
        const args = interaction.data.options

        if(command === "hello") {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "hi!"
                    }
                }
            })
        }
    })
};