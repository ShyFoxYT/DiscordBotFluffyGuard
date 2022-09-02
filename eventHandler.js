module.exports.register = async (client, eventName) => {
    eval(`${eventName}(client);`);
}

function guildMemberAdd(client)
{
    client.on('guildMemberAdd', member => {
        let eventFile = require(`./commands/welcome/guildMemberJoin.js`);
        eventFile.run(client, member);
    });
    console.log("Event guildMemberAdd Registriert");
}