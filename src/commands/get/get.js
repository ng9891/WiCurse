const helpMsg = require("./help");
const {
	db
} = require("../../db_service/firebaseInit.js");

async function getCommand(msg, args) {
	// Checking correct number of params
	if (msg.mentions.users.size !== 1) return; // TODO: ErrMsg: Userid needed or only 1 user

	let userId = args[0].slice(2, -1);
	let mention = msg.mentions.users.firstKey();
	if (userId !== mention) return; // TODO: ErrMsg: 3 param is not a valid userid

	// When arguments are empty
	if (!args[1]) return getAllWords(msg);
	if (args[1].startsWith("f:")) return getWordsFrom(msg, args.slice(2)); // Get rid of <@userid> and :f
	if (args[1].startsWith("t:")) return getWordsTo(msg, args.slice(2)); // Get rid of <@userid> and :t
	if (args[1].startsWith("total")) return getTotal(msg);

	getByWords(msg, args.slice(1)); // Get rid of <@userid>

}

function getAllWords(msg) {
	// Get all curses from the req.user
	let curse_ref = db.collection("curses").doc(msg.mentions.users.firstKey());
	curse_ref.get().then(((doc) => {
		if (!doc.exists) return console.log(`<@${msg.mentions.users.firstKey()} has not made any curses... yet.`);
		let data = doc.data();
		let output = `<@${doc.id}> curse list:\n`;
		Object.keys(data).forEach((k) => {
			output += `${k}: ${data[k]}\n`;
		});

		msg.channel.send(output);
	}));
}

function getWordsTo(msg, args) {
	if (args[0]) {
		// Has words
	} else {
		// get everything from range
	}
}

function getWordsFrom(msg, args) {
	if (args[0]) {
		// Query by range f t
		if (args[0].startsWith === "t") {
			//Query range f to t

			//TODO: Check if it has words.

		} else {
			// Query f with words
		}

	} else {
		// Query f to now everything
	}
}

function getTotal(msg) {
	let users_ref = db.collection("users").doc(msg.mentions.users.firstKey());
	users_ref.get().then((doc) => {
		if (!doc.exists) return msg.channel.send(`<@${msg.mentions.users.firstKey()} has not made any curses... yet.`);
		msg.channel.send(`<@${doc.id}> made a total of ${doc.data().total} curses`);
	});
}

// When there is no f or t and just words
function getByWords(msg, words) {
	// Get by words
	let curse_ref = db.collection("curses").doc(msg.mentions.users.firstKey());
	curse_ref.get().then(((doc) => {
		if (!doc.exists) return msg.channel.send(`<@${msg.mentions.users.firstKey()} has not made any curses... yet.`);
		let data = doc.data();

		let output = `<@${doc.id}> curse list:\n`;
		for (let i = 0; i < words.length; i++) {
			output += `${words[i]}: ${data[words[i]] || 0}\n`;
		}

		msg.channel.send(output);
	}));
}

module.exports = getCommand;