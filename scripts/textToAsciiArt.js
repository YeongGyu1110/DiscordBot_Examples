/*
사용법: /아트 "[문자열]" [폰트]
- [문자열]: 변환할 내용, 큰따옴표("")로 감싸야 됨
- [폰트]: 선택 사항, 폰트를 지정하지 않으면 기본 폰트 생성

예시:
- /아트 "Hello"
- /아트 "World" Big

폰트 종류는 npm figlet에 나와 있음(아마도?)
*/

const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');
const figlet = require('figlet');

client.login(token);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '/아트';
    if (!message.content.startsWith(prefix)) return;

    const textMatch = message.content.match(/"([^"]+)"/);
    if (!textMatch) {
        return message.reply('명령어 형식이 올바르지 않습니다. 예: /아트 "Hello"');
    }
    const textToConvert = textMatch[1];
    const textPart = textMatch[0];
    const fontName = message.content.slice(message.content.indexOf(textPart) + textPart.length).trim();

    const figletOptions = {};
    if (fontName) {
        figletOptions.font = fontName;
    }

    figlet.text(textToConvert, figletOptions, (err, data) => {
        if (err) {
            console.error(err);
            return message.reply(`아트 생성 중 오류가 발생했습니다. 폰트 이름('${fontName}')이 올바른지 확인해주세요.`);
        }

        if (data) {
            message.reply("```\n" + data + "\n```");
        } else {
            message.reply('아트 생성에 실패했습니다.');
        }
    });
});

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\nAsciiArt bot is ready!'));