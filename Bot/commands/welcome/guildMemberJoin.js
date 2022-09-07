const {MessageEmbed, MessageAttachment } = require('discord.js');
const { Command, CommandoMessage } = require('discord.js-commando');
const fs = require('fs');
const {createCanvas, loadImage, Canvas} = require('@napi-rs/canvas');
const { request } = require('undici');
const fetch = require("node-fetch");

let user_data;
let json_user_data;
let file = ('commands/server/profile')


module.exports.run = async(client, member) => {
    fs.open(file + member.id + '.json', 'r+', (err, fd) => {
        if(err) {
            if (err.code === 'ENOENT'){
                console.log(member.displayName + ' ist ein neuer Nutzer! Die JSON file wurde mit folgender ID angelegt.');
                console.log('ID: ' + member.id);
                console.log(err.code);

                //Anlegen der JSON file.
                user_data = user_data || {};
                json_user_data = JSON.stringify(user_data);
                fs.writeFileSync('commands/server/profile/' + member.id + '.json', json_user_data);
                console.log("Operation erfolgreich!");
            } else {
                console.log("Dieser User ist bereits hier gewesen. Keine Operation vorgenommen.");
            }
        }
    });
    


    let filePath = ('server/profiles/');
    let images = ('commands/welcome/assets/');
    const memberAva = member.user.displayAvatarURL({ extension: 'jpg' }).replace('webp', 'png');
    let joinmsgchannel = client.channels.cache.get('1002274459069202612');
    let { user } = member;
    var name = user.tag;

    const applyText = (canvas, text) => {
        const context = canvas.getContext('2d');
    
        let fontSize = 60;
    
        do {
            context.font = `${fontSize -= 10}px "sans-serif"`;
        } while (context.measureText(text).width > canvas.width - 300);
    
        return context.font;
    };

    const canvas = createCanvas(700, 250);
    const context = canvas.getContext("2d");
    
    context.fillStyle = '#ffffff'
    const bgr = await loadImage(images + 'bgr.png');
    context.drawImage(bgr, 0, 0 , canvas.width, canvas.height);
    const avatar = await loadImage(memberAva);
    context.drawImage(avatar, 25, 25, 200, 200);
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.font = '28px "sans-serif"';
    context.fillText("Willkommen!", canvas.width / 2.5, canvas.height / 3.5);
    context.font = applyText(canvas, member.displayName);
    context.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

    const fileName = member.username + '.png';
    const attachment = new MessageAttachment(await canvas.encode('png'), fileName);

    await joinmsgchannel.send({
        content: 'Willkommen ' + member.displayName + ' auf dem Server!',
        files: [attachment]
    });

}