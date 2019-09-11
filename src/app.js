const runCommand = require("./commands/botCommands");
const incrementCurseCount = require("./incrementCurseCount.js");
const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();

bot.once("ready", () => {
	console.log("Bot is connected and ready.");
});

bot.login(process.env.DISCORD_TOKEN);

bot.on("message", (msg) => {
	// Do nothing if you are a bot or an attatchment or a link
	if (msg.author.bot || msg.attachments.size > 0 || msg.embeds[0]) return;

	// Checking for commands
	if (msg.content[0] === "!") {
		return runCommand(bot, msg);
	}

	incrementCurseCount(msg);
});