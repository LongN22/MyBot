require('dotenv').config();

const discord  = require('discord.js');
const client = new discord.Client();
const PREFIX = '!';
const axios = require('axios');

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', ()=> {
    console.log('MyBot ONLINE');
});

client.on('message', async msg =>{
    if(msg.content == 'test'){
        msg.reply("test");
        msg.react("❤️");
    }

    if(msg.content.startsWith(PREFIX)){
        const [COMMAND, ...args] = msg.content.trim().substring(1).split(/\s+/);
        //msg.channel.send(test);
        //console.log(arges);

        if(COMMAND == "weather"){
            let getWeather = async () => {
                if(!args[0]){
                    msg.reply("please put city");
                    return;
                }

                cityName = args[0];
                for (i = 1; i < args.length; i++) {
                    cityName = cityName + " " + args[i];
                }

                let response = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + (process.env.WEATHER_API));
                let temp = response.data;
                return temp;
            }
            const res = await getWeather();
            console.log(res);
            msg.reply(Math.round((res.main.temp - 273.15) * 9/5 + 32) + "°F");
        }
    }
    
});