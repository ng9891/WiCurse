/* eslint-disable indent */
const getCommand = require("./get/get");
const translate = require("./trans/trans");
const helpMsg = require("../helper/helper");

function runCommand(msg) {
	let split_msg = msg.content.toLowerCase().trim().split(" ");
	let cmd = split_msg[1];
	let args = split_msg.slice(2);

	if (msg.channel.type === "dm") return msg.channel.send("Sorry commands not available on DM's");

	switch (cmd) {
		case "trackcurse":
			break;
		case "stopcurse":
			// Stop tracking but doesnt not eliminate previous record.
			break;
		case "trans":
			translate(msg);
			break;
		case "get":
			getCommand(msg, args);
			break;
		case "help":
			helpMsg(msg);
			break;
	}
}

module.exports = runCommand;