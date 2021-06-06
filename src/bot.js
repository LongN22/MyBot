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
    if(msg.content.startsWith(PREFIX)){
        const [COMMAND, ...args] = msg.content.trim().substring(1).split(/\s+/);

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
                return response.data;
            }

            const res = await getWeather();
            console.log(res);

            function convertKToC(temp){
                return temp - 273.15;
            }

            function convertKToF(temp){
                return (temp - 273.15) * 9/5 + 32;
            }

            const test = new discord.MessageEmbed()
                .setColor('#3498DB')
                .setAuthor(cityName.toUpperCase())
                .setTitle('Temperature')
                .setDescription(Math.round(convertKToF(res.main.temp)) + "°F / " + Math.round(convertKToC(res.main.temp)) + "°C")
                //.addField('\u200b', '\u200b')
                .addField('Feels Like', Math.round(convertKToF(res.main.temp)) + "°F / " + Math.round(convertKToC(res.main.temp)) + "°C")
                .setThumbnail('http://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png')
                .addField('High', Math.round(convertKToF(res.main.temp_max)) + "°F / " + Math.round(convertKToC(res.main.temp_max)) + "°C" , true)
                .addField('Low', Math.round(convertKToF(res.main.temp_min)) + "°F / " + Math.round(convertKToC(res.main.temp_min)) + "°C" , true)
                .addField('Wind', Math.round(res.wind.speed * 2.237) + " mph", true);

            msg.reply(test);

        }
    }
    
});