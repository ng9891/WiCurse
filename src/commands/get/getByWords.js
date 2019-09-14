const {
	db
} = require("../../db_service/firebase.js");

// When there is no f or t and just words
function getByWords(msg, words) {
	// Get by words
	let curse_ref = db.collection("curses").doc(msg.mentions.users.firstKey());
	curse_ref.get().then(((doc) => {
		if (!doc.exists) return msg.channel.send(`<@${msg.mentions.users.firstKey()}> has not made any curses... yet.`);
		let data = doc.data();

		let output = `<@${doc.id}> curse list:\n\`\`\``;
		for (let i = 0; i < words.length; i++) {
			output += `${words[i]}: ${data[words[i]] || 0}\n`;
		}
		output += "```";

		msg.channel.send(output);
	}));
}

module.exports = getByWords;