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


거의 모든 주요 언어의 ISO 639-1 표준 코드를 지원
   * 한국어: ko
   * 영어: en
   * 일본어: ja
   * 중국어 (간체): zh-cn
   * 중국어 (번체): zh-tw
   * 프랑스어: fr
   * 스페인어: es
   * 독일어: de
   * 러시아어: ru
   * 베트남어: vi
   * 태국어: th
   * 인도네시아어: id

사용법: /번역 "[문장]" [시작 언어] > [언어] > [언어]
예시: /번역 "안녕, 세상!" ko > en

- [문장]: 번역할 문장, 큰따옴표("")로 감싸야 됨
- [언어]: 공식 언어코드(ko, en, ja..등등)로 작성하며, 큰따옴표("")나 작은따옴표('')로 감싸지 않음

[언어]는 여러개 사용 가능
다만 [언어]수가 많아지면 많아질수록 딜레이가 길어짐
*/

const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');
const translate = require('@iamtraction/google-translate');

client.login(token);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '/번역';
    if (!message.content.startsWith(prefix)) return;

    const textMatch = message.content.match(/"([^"]+)"/);
    if (!textMatch) {
        return message.reply('명령어 형식이 올바르지 않습니다. 예: /번역 "안녕하세요" ko > en');
    }
    const textToTranslate = textMatch[1];
    const textPart = textMatch[0];
    const languagesPart = message.content.slice(message.content.indexOf(textPart) + textPart.length).trim();
    const languages = languagesPart.split('>').map(lang => lang.trim()).filter(lang => lang);

    if (languages.length < 2) {
        return message.reply('두 개 이상의 언어 코드를 입력해야 합니다. 예: ko > en');
    }

    let currentText = textToTranslate;
    let resultMessage = `원본 (${languages[0]}): "${currentText}"\n`;

    try {
        for (let i = 0; i < languages.length - 1; i++) {
            const fromLang = languages[i];
            const toLang = languages[i + 1];

            const translation = await translate(currentText, { from: fromLang, to: toLang });
            currentText = translation.text;

            if (i === languages.length - 2) {
                resultMessage += `> **${toLang}**: **${currentText}**\n`;
            } else {
                resultMessage += `> **${toLang}**: ${currentText}\n`;
            }
        }

        message.reply(resultMessage);

    } catch (error) {
        console.error(error);
        message.reply(`번역 중 오류가 발생했습니다. 언어 코드('${error.message.match(/The language '(.+?)' is not supported/)?.[1] || ''}')가 유효한지 확인해주세요.`);
    }
});
client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\nTranslator bot is ready!'));