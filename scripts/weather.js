/*
이 소스에는 GPL 3.0이 적용되어있습니다.
Copyright (c) 2025 cYs1lent

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.


사용법: /날씨 [도시이름]
예시: /날씨 서울
*/

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');
const https = require('https');

client.login(token);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '/날씨 ';
    if (message.content.startsWith(prefix)) {
        const cityName = message.content.substring(prefix.length);
        if (!cityName) {
            return message.reply('도시 이름을 입력해주세요. 예: /날씨 서울');
        }

        const options = {
            hostname: 'wttr.in',
            path: `/${encodeURIComponent(cityName)}?format=j1`,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        };

        const req = https.request(options, res => {
            let data = '';
            if (res.statusCode !== 200) {
                console.error(`API returned status code: ${res.statusCode}`);
                return message.reply(`'${cityName}' 도시의 날씨를 찾을 수 없어요. 도시 이름을 확인해주세요.`);
            }

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const weather = JSON.parse(data);
                    const current = weather.current_condition[0];
                    const forecast = weather.weather[0];

                    const embed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle(`${weather.nearest_area[0].areaName[0].value}, ${weather.nearest_area[0].country[0].value}의 날씨`)
                        .setDescription(`**${current.weatherDesc[0].value}**`)
                        .addFields(
                            { name: '현재 기온', value: `${current.temp_C}°C`, inline: true },
                            { name: '체감 온도', value: `${current.FeelsLikeC}°C`, inline: true },
                            { name: '습도', value: `${current.humidity}%`, inline: true },
                            { name: '풍속', value: `${current.windspeedKmph} km/h`, inline: true },
                            { name: '일출', value: `${forecast.astronomy[0].sunrise}`, inline: true },
                            { name: '일몰', value: `${forecast.astronomy[0].sunset}`, inline: true }
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Powered by wttr.in' });

                    message.reply({ embeds: [embed] });

                } catch (error) {
                    console.error('API 응답 파싱 중 오류 발생:', error);
                    message.reply('날씨 정보를 처리하는 중 오류가 발생했습니다.');
                }
            });
        });

        req.on('error', error => {
            console.error('API 요청 중 오류 발생:', error);
            message.reply('날씨 API에 연결하는 중 오류가 발생했습니다.');
        });

        req.end();
    }
});

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\nWeather bot is ready!'));
