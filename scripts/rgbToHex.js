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


사용법: /변환 [Red값] [Blue값] [Green값]
Red, Blue, Green 값이 모두 입력되어야 하며,
각 값에는 큰따옴표("")나 작은 따옴표('')로 감싸지 않음
*/
const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');

client.login(token);

client.on('messageCreate', (message) => {
    const cmd = message.content;

    function rgbToHex(r, g, b) {
        const toHex = (c) => {
            const hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    if (cmd.startsWith('!rgb')) {
        const args = cmd.split(' ');

        if (args.length === 4) {
            const r = parseInt(args[1], 10);
            const g = parseInt(args[2], 10);
            const b = parseInt(args[3], 10);

            if (!isNaN(r) && !isNaN(g) && !isNaN(b) && r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                const hexColor = rgbToHex(r, g, b);
                message.reply(`RGB(${r}, ${g}, ${b})변환결과: ${hexColor}`);
            } else {
                message.reply('잘못된 RGB 값입니다. 각 값은 0에서 255 사이의 숫자여야 합니다.');
            }
        } else {
            message.reply('사용법: !rgb [R 값] [G 값] [B 값] (예: !rgb 255 128 0)');
        }
    }
});

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\ncolorCodeConverter bot is ready'));