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

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\nStart!'));