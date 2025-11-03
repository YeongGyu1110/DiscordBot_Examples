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

사용법: /변환 "[문자열 또는 숫자]" [변환하려는 진수]
- [문자열 또는 숫자]: 변환할 내용, 큰따옴표("")로 감싸야 됨
- [변환하려는 진수]: 2부터 36까지의 숫자

예시:
- /변환 "1024" 2 (숫자 1024를 2진법으로)
- /변환 "Hello" 16 (문자열 "Hello"를 16진법으로)
*/

const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');

client.login(token);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const prefix = '/변환';
    if (!message.content.startsWith(prefix)) return;

    const textMatch = message.content.match(/"([^\"]+)"/);
    if (!textMatch) {
        return message.reply('명령어 형식이 올바르지 않습니다. 예: /변환 "123" 10');
    }
    const inputValue = textMatch[1];
    const textPart = textMatch[0];
    const radixStr = message.content.slice(message.content.indexOf(textPart) + textPart.length).trim();
    const radix = parseInt(radixStr, 10);
    
    if (isNaN(radix) || radix < 2 || radix > 36) {
        return message.reply('진수는 2에서 36 사이의 숫자여야 합니다.');
    }
    
    let result = '';
    let inputType = '';
    
    if (/^\d+$/.test(inputValue)) {
        inputType = '숫자';
        try {
            result = BigInt(inputValue).toString(radix);
        } catch (error) {
            return message.reply('숫자 변환 중 오류가 발생했습니다. 너무 큰 숫자일 수 있습니다.');
        }
    } else {
        inputType = '문자열';
        result = inputValue
        .split('')
        .map(char => {
            const codePoint = char.charCodeAt(0);
            return codePoint.toString(radix);
        })
        .join(' ');
    }
    
    if (result) {
        message.reply(`**입력 (${inputType})**: \"${inputValue}\"\n**${radix}진법 변환 결과**: \`\`\`${result}\`\`\``);
    } else {
        message.reply('변환에 실패했습니다.');
    }
});

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\nBaseConverter bot is ready!'));