const path = require('path');
const runCommand = require('./commands/botCommands');
const incrementCurseCount = require('./incrementCurseCount.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
require('toml-require').install({toml: require('toml')});

const CONFIG = require(path.join(process.cwd(), 'conf/user_config.toml'));

bot.on('message', (msg) => {
  // Do nothing if you are a bot or a link
  if (msg.author.bot || msg.embeds.length > 0) return;

  // Checking if its !wc
  if (msg.content.trim().slice(0, 3) === '!wc') return runCommand(msg);

  incrementCurseCount(msg);
});

bot.on('error', (err) => {
  console.log(err);
});

bot.login(CONFIG.DISCORD_TOKEN).then(() => {
  console.log('Bot is connected and ready.');
}).catch((err) => console.log(`Loggin error: [${Date.now()}]\n ${err}`));
