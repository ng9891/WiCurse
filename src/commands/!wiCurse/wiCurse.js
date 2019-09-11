/* eslint-disable indent */
const db = require("../../db_service/firebaseInit");
const helpMsg = require("./help");

function wiCurse(msg, args) {
	switch (args[0]) {
		case "help":
			helpMsg(msg);
			break;
		case "get":
			if (msg.channel.type === "dm") return msg.channel.send("Sorry command not available in DM's");
			getUserCount(msg, args.slice(1)); // Take out "get"
			break;
		default:
			// query for yourself
			// a number for how long ago.
			console.log(args);
			break;
	}
}

async function getUserCount(msg, args) {
	if (args.length < 1 || args.length > 2) {
		// TODO: Display help message.
		return helpMsg(msg);
	}

	let user = {
		username: args[0]
	};
	let found = false;
	msg.guild.members.forEach((member, id) => {
		if (user.username === member.user.username.toLowerCase()) {
			user.id = id;
			found = true;
		}
	});

	if (!found) return msg.channel.send("Username not found.");

	switch (args[1]) {
		case "all":
			console.log("get all");
			break;
		default:
			console.log("Get by date ranges");
			break;
	}
	// let ref = db.collection("tracking").doc(msg.author.id).collection("curses").doc("byDate");
}

module.exports = wiCurse;