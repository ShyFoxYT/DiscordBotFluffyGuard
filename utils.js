const fs = require("fs");
const eventHandler = require('./eventHandler.js');


module.exports.registerEvents = async (client) => {
    eventHandler.register(client,'guildMemberAdd');
}