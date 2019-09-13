const runCommand = require("./commands/botCommands");
const incrementCurseCount = require("./incrementCurseCount.js");
const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();

bot.on("message", (msg) => {
	// Do nothing if you are a bot or a link
	if (msg.author.bot || msg.embeds[0]) return;

	// Checking if its !wc
	if (msg.content.trim().slice(0, 3) === "!wc") return runCommand(msg);

	incrementCurseCount(msg);
});

bot.on("error", err => {
	console.log(err);
});

bot.login(process.env.DISCORD_TOKEN).then(() => {
	console.log("Bot is connected and ready.");
}).catch((err) => console.log(`Loggin error: [${Date.now()}]\n ${err}`));