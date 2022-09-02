const { MessageAttachment, MessageEmbed} = require('discord.js');
const { Command, CommandoMessage } = require('discord.js-commando');
const fs = require('fs');

let file = ('commands/server/profile/');
let json_user_data;
let user_data;

module.exports = class setepic extends Command{
    constructor(client) {
        super(client, {
            name: 'setepic',
            group: 'aboutme',
            aliases:['sepic'],
            description: 'Saves the epic name',
            memberName: 'setepic',
            guildOnly: true,
            args: [{
                key: 'name',
                prompt: 'Bitte kopiere nur deinen namen!',
                type: 'string'
            }]
        });
    }


    async run(message, {name}){

        if (message.member.bot) return;
        if (message.channel.id === '1014153348892602488') {
            if(message.author.bot) return;
                   
            fs.open(file + message.member.id + '.json', 'r+', (err, fd) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        message.channel.send('Es ist ein fehler aufgetreten \n ```' + err.code + '```');
                    } else {
                        throw err;
                    }
                } else {
                    json_user_data = fs.readFileSync(file + message.member.id + '.json', 'utf-8');
                    user_data = JSON.parse(json_user_data);

                    user_data.about = user_data.about || {};
                    user_data.about.epic = name
                    
                    json_user_data = JSON.stringify(user_data);
                    fs.writeFileSync('commands/server/profile/' + message.member.id + '.json', json_user_data);
                    message.reply('Erfolgreich gespeichert')  
            }
        })
        }else{
            message.reply('Sorry, dieser command kann nur in <#1014153348892602488> ausgeführt werden!\nBitte führe den Befehl dort aus.')
        }
    }


}