const {MessageAttachment, MessageEmbed} = require('discord.js');
const {Command, CommandoMessage} = require('discord.js-commando');
const fs = require('fs');
const {createCanvas, loadImage, Canvas, convertSVGTextToPath} = require('@napi-rs/canvas');
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
            description: 'Views the profilecard.',
            memberName: 'view',
            guildOnly: true,
            args: [{
                key: 'mention',
                default: (msg) = msg.member,
                type: 'user'
            }]
        });
    }

    async run(message, {mention}){
        if(message.author.bot) return;
        
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
    }
}