/* eslint-disable indent */
const wiCurse = require("./!wiCurse/wiCurse");

function runCommand(msg) {
	let split_msg = msg.content.toLowerCase().split(" ");
	let cmd = split_msg[0];
	let args = split_msg.slice(1);

	switch (cmd) {
		case "!trackcurse":
			break;
		case "!stopcurse":
			// Stop tracking but doesnt not eliminate previous record.
			break;
		case "!wc":
		case "!wicurse":
			wiCurse(msg, args);
			break;
	}
}

module.exports = runCommand;