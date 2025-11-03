# Discord.js 봇 예제 코드

JavaScript(`discord.js`)를 사용한 디스코드 봇 예제 코드입니다.

## 🛠️ 사용된 기술 및 라이브러리

*   **[discord.js](https://discord.js.org/)**: Discord API와 상호작용하기 위한 라이브러리입니다.
*   **[@iamtraction/google-translate](https://www.npmjs.com/package/@iamtraction/google-translate)**: 구글 번역 API를 사용하여 텍스트를 번역합니다.
*   **[figlet](https://www.npmjs.com/package/figlet)**: 텍스트를 ASCII 아트로 변환합니다.

## 🚀 봇 실행 방법

1.  **Node.js 설치**: 이 프로젝트를 실행하려면 [Node.js](https://nodejs.org/)가 설치되어 있어야 합니다.
2.  **필요한 라이브러리 설치**: 터미널에서 다음 명령어를 실행하여 필요한 라이브러리를 설치합니다.
    ```bash
    npm install
    ```
3.  **봇 토큰 설정**: `main.js` 파일이 있는 경로에 `token.js` 파일을 생성하고, 그 안에 디스코드 봇 토큰을 입력해야 합니다.
    ```javascript
    // token.js
    module.exports = {
        token: 'YOUR_DISCORD_BOT_TOKEN'
    };
    ```
4.  **봇 실행**: 터미널에서 다음 명령어를 실행하여 봇을 실행합니다.
    ```bash
    node main.js
    ```

## 📜 사용 가능한 스크립트

`scripts` 폴더에는 바로 `main.js`에 붙여넣어 사용할 수 있는 다양한 기능의 예제 코드가 포함되어 있습니다. 코딩에 익숙하지 않은 분들은 아래 스크립트 파일의 코드를 복사하여 `main.js` 파일에 붙여넣기만 하면 해당 기능을 사용할 수 있습니다.

*   `한글분석기.js`: 한글 메시지를 분석하는 기능입니다.
*   `baseConverter.js`: 진법 변환 기능입니다.
*   `rgbToHex.js`: RGB 색상 코드를 HEX 코드로 변환하는 기능입니다.
*   `textToAsciiArt.js`: 텍스트를 ASCII 아트로 변환하는 기능입니다.
*   `translator.js`: 구글 번역 API를 이용한 번역 기능입니다.

## 📜 라이센스 (License)

이 프로젝트는 [GNU General Public License v3.0](LICENSE)에 따라 라이센스가 부여됩니다. 자세한 내용은 `LICENSE` 파일을 참고하십시오.