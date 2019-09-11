const db = require("../../db_service/firebaseInit");
const helpMsg = require("./help");

function wiCurse(bot, val) {
	switch (val[0]) {
		case "help":
			helpMsg(bot);
			break;
		case "":
			break;
		default:
			// a number for how long ago.
			console.log(val);
			break;
	}
}

module.exports = wiCurse;