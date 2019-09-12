/* eslint-disable indent */
const getCommand = require("./get/get");

function runCommand(msg) {
	let split_msg = msg.content.toLowerCase().trim().split(" ");
	let cmd = split_msg[1];
	let args = split_msg.slice(2);

	switch (cmd) {
		case "trackcurse":
			break;
		case "stopcurse":
			// Stop tracking but doesnt not eliminate previous record.
			break;
		case "get":
			if (msg.channel.type === "dm") return msg.channel.send("Sorry command not available in DM's");
			getCommand(msg, args);
			break;
		case "help":
			break;
	}
}

module.exports = runCommand;