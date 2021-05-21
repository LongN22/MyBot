require('dotenv').config();

const discord  = require('discord.js');
const client = new discord.Client();
const PREFIX = '!';

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', ()=> {
    console.log('MyBot ONLINE');
});

client.on('message', msg =>{
    if(msg.content == 'test'){
        msg.reply("test");
        msg.react("❤️");
    }

    if(msg.content.startsWith(PREFIX)){
        const [CMD, test] = msg.content.trim().substring(1).split(/\s+/);
        msg.channel.send(test);
        console.log(test);
    }
});