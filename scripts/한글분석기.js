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


사용법: /변환 [변환할 한글]
- [변환할 한글]: 현재 사용되는 한글로만 작성해야 하며, 큰따옴표("")나 작은따옴표('')로 감싸지 않음
*/

const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../token.js');

client.login(token);

function analyzeHangulChar(char) {
    const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const JUNG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
    const JONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

    let code = char.charCodeAt(0);

    if ((code >= 0x3131 && code <= 0x314E) || (code >= 0x314F && code <= 0x3163)) {
        return {
            char: char,
            초성: CHO.includes(char) ? char : "없음",
            중성: JUNG.includes(char) ? char : "없음",
            종성: "없음"
        };
    }

    if (code >= 0xAC00 && code <= 0xD7A3) {
        let offset = code - 0xAC00;
        let choIndex = Math.floor(offset / (21 * 28));
        let jungIndex = Math.floor((offset % (21 * 28)) / 28);
        let jongIndex = offset % 28;

        return {
            char: char,
            초성: CHO[choIndex],
            중성: JUNG[jungIndex],
            종성: JONG[jongIndex] || "없음"
        };
    }

    return { char, message: "한글이 아닙니다.1" };
}

client.on('messageCreate', (message) => {

    const cmd = message.content;

    if (cmd.startsWith("/분석 ")) {
        let inputText = cmd.replace("/분석 ", "").trim();

        if (inputText.length === 0) {
            replier.reply("한 글자 이상 입력해 주세요.");
            return;
        }

        let responseMessage = "";
        let lastWasSpace = false;
        let processedText = inputText.replace(/ /g, "");
        let isSingleChar = processedText.length === 1;
        let count = 1;

        if (!isSingleChar) {
            responseMessage += `입력한 글자: ${inputText}\n\n`;
        }

        for (let i = 0; i < inputText.length; i++) {
            let char = inputText[i];
            if (char === " ") {
                lastWasSpace = true;
                continue;
            }

            let result = analyzeHangulChar(char);
            if (result.message) {
                responseMessage += isSingleChar
                    ? `입력한 글자: ${result.char}\n한글이 아닙니다.\n\n`
                    : `\n${count}번째 글자: ${result.char}\n한글이 아닙니다.\n`;
            } else {
                responseMessage += isSingleChar
                    ? `입력한 글자: ${result.char}\n` +
                    `초성: ${result.초성}\n` +
                    `중성: ${result.중성}\n` +
                    `종성: ${result.종성}\n`
                    : `${count}번째 글자: ${result.char}\n` +
                    `초성: ${result.초성}\n` +
                    `중성: ${result.중성}\n` +
                    `종성: ${result.종성}\n`;

                if (!isSingleChar && i < inputText.length - 1) {
                    if (lastWasSpace) {
                        responseMessage += "\n\n";
                        lastWasSpace = false;
                    } else {
                        responseMessage += "\n";
                    }
                }
            }
            count++;
        }
        message.reply(responseMessage.trim());
    }
});

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]\n한글분석기 is ready'));