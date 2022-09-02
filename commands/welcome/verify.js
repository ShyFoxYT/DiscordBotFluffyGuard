const { MessageEmbed } = require('discord.js');
const {Command, CommandoMessage } = require('discord.js-commando');
const fs = require('fs');

let file = ('commands/server/profile/');
let json_user_data;
let user_data;

module.exports = class verify extends Command{
    constructor(client) {
        super(client,{
            name: 'verify',
            group: 'welcome',
            description: 'Verifies a member',
            memberName: 'verify',
            guildOnly: true,
        });
    }

    async run(message){

        if (message.author.bot) return;
        if (message.channel.id === '1002275609570975794'){
            if(message.member.roles.cache.find(r => r.id=== '1002261704496910376')){
                const aV = new MessageEmbed()
                .setColor('red')
                .setTitle('Verifizierungsprozess')
                .setDescription('Du bist bereits Verifiziert!\nDu solltest dies eigendlich nicht sehen, sollte für dich der Server trotzdem nicht zu sehen sein,\nBitte kontaktiere einen Moderator.')
                
                await cannel.send(aV);
            } else {
                const aV = new MessageEmbed()
                .setColor('green')
                .setTitle('Verifizierungsprozess')
                .setDescription('Du wurdest verifiziert! Bitte schreibe aber dennoch einen kleinen Text in <#1007736196186779668> um dich bekannt zu machen')
                .addFields(
                    { name: 'Lege dir ein Profil an', value: 'Lege dir ein profil in <#1014153348892602488> an um andere schneller deine Sozialen Medien zu finden.', inline: true},
                    { name: 'Freundliche Community!', value: 'Unser Ziel ist es eine tolle Community aufzubauen, wir sind schon sehr gut dabei!'}
                );

                fs.open(file + message.member.id + '.json', 'r+', (err, fd) => {
                    if (err){
                        if (err.code === 'ENOENT') {
                            console.log('Member ' + message.member.displayName + ' ist wohl gejoint als der Bot aus war. Jedenfalls wird nun eine JSON file angelegt als');
                            console.log('Dateiname: ' + message.author.id + '.json');

                            //Anlegen der File
                            user_data = user_data || {};
                            json_user_data = JSON.stringify(user_data);
                            fs.writeFileSync('commands/server/profile/' + message.author.id + '.json', json_user_data);
                            console.log('Operation Erfolgreich');

                            message.member.roles.add('Registriert');
                            message.send(aV);
                        } else {
                            message.member.roles.add('Registriert');
                            channel.send(aV);
                        }
                    }
                });
            }
        } else {
            message.reply('Oops... Das sollte nicht passieren. Dieser befehl ist nur in <#1002275609570975794> funktionieren!')
        }
    }
}