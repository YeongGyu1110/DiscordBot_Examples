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

사용법: /모스 "[문자열 및 숫자]"
- [문자열 및 숫자]: 모스부호로 변환할 내용, 큰따옴표("")로 감싸야 됨
*/

const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');

client.login(token);

const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '@': '.--.-.', ' ': '/'
};

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '/모스';
    if (!message.content.startsWith(prefix)) return;

    const textMatch = message.content.match(/"([^"]+)"/);
    if (!textMatch) {
        return message.reply('명령어 형식이 올바르지 않습니다. 예: /모스 "Hello World"');
    }
    const inputText = textMatch[1];

    let morseCodeResult = '';
    for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i].toUpperCase();
        if (morseCodeMap[char]) {
            morseCodeResult += morseCodeMap[char] + ' ';
        } else {
            morseCodeResult += '? ';
        }
    }

    if (morseCodeResult.trim()) {
        message.reply("**입력**: " + inputText + "\n**모스 부호 변환 결과**: ```" + morseCodeResult.trim() + "```");
    } else {
        message.reply('변환할 수 있는 문자가 없습니다.');
    }
});

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\nTextToMorse bot is ready!'));
