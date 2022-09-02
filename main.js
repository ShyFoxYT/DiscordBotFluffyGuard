const { MessageEmbed } = require ('discord.js');
const { CommandoClient, Command, CommandoMessage } = require('discord.js-commando');
const path = require ('path');
const utils = require('./utils.js');
require('dotenv').config();

const client = new CommandoClient({
    commandPrefix:'!',
    partials: ['USER','CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'],
    presence: {
        status: 'online',
        activity: {
            name: 'mit seinem Tail',
            type: 'PLAYING'
        }
    }
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        { id: 'aboutme', name: 'Aboutme', guarded: true},
        { id: 'welcome', name: 'welcome', guarded: true}
    ])
    .registerCommandsIn(path.join(__dirname, '/commands'));

client.on('ready', () => {
    utils.registerEvents(client);
    const { username, tag } = client.user;
    console.log(`${username} ist online! => Eingeloggt als ${tag}`);
});

client.on('commandError', async (command, error, message) => {
    const reply = new MessageEmbed()
        .setColor('RED')
        .setDescription('**Es ist ein unerwarteter Fehler aufgetreten** \nBitte kontaktiere einen Admin!')
        .addField(error.name, '```' + error.message + '```');

    await message.reply({ embed: reply});

    await errorHandler(error, 'Command error', message, command);
});

process.on('unhandledRejection', error => errorHandler(error, 'Unhandled rejection'));
process.on('uncaughtException', error => errorHandler(error, 'Uncaught exception'));
process.on('uncaughtExceptionMonitor', error => errorHandler(error, 'Uncaught exception monitor'));
process.on('warning', error => errorHandler(error, 'Process warning'));
client.on('error', error => errorHandler(error, 'Client error'));
client.on('warn', warn => errorHandler(warn, 'Client warn'));

client.login();

async function errorHandler(error, type, message, command) {
    if (error instanceof Error) {
        console.error(error);

        const length = error.name.length + error.message.length + 3;
        const stack = error.stack?.substring(length).replace(/ +/g, ' ').split('\n');
        const root = __dirname.split(/[\\/]/g).pop();

        const files = stack.filter(str =>
            !str.includes('node_modules') &&
            !str.includes('(internal') &&
            !str.includes('(<anonymous>)') &&
            str.includes(root)
        ).map(str =>
            '>' + str.replace('at ', '')
                .replace(__dirname, root)
                .replace(/([\\]+)/g, '/')
        ).join('\n');
    }
    console.warn(error);
}
