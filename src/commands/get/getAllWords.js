const printObjToChannel = require("../../helper/printObjToChannel");
const {
	db
} = require("../../db_service/firebase.js");

function getAllWords(msg) {
	// Get all curses from the req.user
	let curse_ref = db.collection("curses").doc(msg.mentions.users.firstKey());
	curse_ref.get().then(((doc) => {
		if (!doc.exists) return console.log(`<@${msg.mentions.users.firstKey()} has not made any curses... yet.`);
		let data = doc.data();
		printObjToChannel(msg, data);
	}));
}

module.exports = getAllWords;