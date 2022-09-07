const {MessageAttachment, MessageEmbed} = require('discord.js');
const {Command, CommandoMessage} = require('discord.js-commando');
const fs = require('fs');
const {createCanvas, loadImage, Canvas, fillText} = require('@napi-rs/canvas');
const { request } = require('undici');
const fetch = require('node-fetch');

let user_data;
let json_user_data;
let file = ('commands/server/profile');
let images = ('commands/aboutme/assets/')


module.exports = class view extends Command{
    constructor(client) {
        super (client,{
            name: 'view',
            group: 'aboutme',
            description: 'views the profilecard.',
            memberName: 'view',

            guildOnly: true,
            args: [{
                key: 'mention',
                prompt: 'Please type only one username',
                type: 'user',
                default: (msg) => msg.member,
                
            }]
        });
    }

    async run(message, {mention}){
        if(message.author.bot) return;
        const memberAva = mention.user.displayAvatarURL({ type: 'png'});
        
        fs.open(file + mention.id + '.json', 'r+', (err, fd) => {
            if (err){
                if(err.code === 'ENOENT'){
                    message.channel.send('It seems like that user don\'t hava a userfile. `` ENOENT!``');
                } else {
                    throw err;
                }
            } else {
                json_user_data = fs.readFileSync(file + mention.id + '.json', 'utf-8');
                user_data = JSON.parse(json_user_data);
            }
        });

        const canvas = createCanvas(640, 439);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = '#ffffff';
        const bgr = await loadImage(images + 'bgr.png');
        ctx.drawImage(bgr, 0, 0, canvas.width, canvas.height);
        const avatar = await loadImage(memberAva);
        ctx.drawImage(avatar, 25, 25, 200, 200);
        ctx.strokeRect(25,25, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(125,125,100,0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.font = 'bold 28px "sans-serif"';
        ctx.fillText(mention.displayName, 225, 60);
        ctx.fillText('Role:', 225, 95);
        ctx.fillText('XP:', 225, 115);

        const fileName = mention.id + '.png';
        const attachment = new MessageAttachment(await canvas.encode('png'),{ name: mention.id + '.png'});
        const newEmbed = new MessageEmbed()
        .setImage('attachment://' + fileName);

        await message.reply({
            embed: newEmbed,
            files: [attachment]
        });

    }
}