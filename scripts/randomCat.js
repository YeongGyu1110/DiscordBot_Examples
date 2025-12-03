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


사용법: /고양이
*/

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');
const https = require('https');

client.login(token);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '/고양이') {
        const options = {
            hostname: 'api.thecatapi.com',
            path: '/v1/images/search',
            method: 'GET'
        };

        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    if (parsedData && parsedData.length > 0 && parsedData[0].url) {
                        const catImageUrl = parsedData[0].url;

                        const embed = new EmbedBuilder()
                            .setColor('#0099ff')
                            .setTitle('랜덤 고양이 사진!')
                            .setImage(catImageUrl)
                            .setTimestamp();

                        message.reply({ embeds: [embed] });
                    } else {
                        message.reply('고양이 사진을 불러오는 데 실패했습니다.');
                    }
                } catch (error) {
                    console.error('API 응답 파싱 중 오류 발생:', error);
                    message.reply('고양이 사진을 처리하는 중 오류가 발생했습니다.');
                }
            });
        });

        req.on('error', error => {
            console.error('API 요청 중 오류 발생:', error);
            message.reply('고양이 API에 연결하는 중 오류가 발생했습니다.');
        });

        req.end();
    }
});

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\nRandomCat bot is ready!'));
