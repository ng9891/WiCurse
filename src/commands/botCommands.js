/* eslint-disable indent */
const wiCurse = require("./!wiCurse/wiCurse");

function runCommand(bot, msg) {
	let split_msg = msg.content.split(" ");
	let cmd = split_msg[0];
	let value = split_msg.slice(1);

	switch (cmd) {
		case "!test":
			console.log(cmd, value);
			break;
		case "!trackcurse":
			break;
		case "!stopcurse":
			// Stop tracking but doesnt not eliminate previous record.
			break;
		case "!cursemuch":
			break;
		case "!wicurse":
			wiCurse(bot, value);
			break;
	}
}

module.exports = runCommand;