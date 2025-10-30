const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { token } = require('../config.js');

client.login(token);

client.once('clientReady', () => console.log('Github Repository: [https://github.com/YeongGyu1110/DiscordBot_Examples]'))