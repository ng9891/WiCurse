// const moment = require("moment");
const {
	db,
	admin
} = require("./db_service/firebase");

async function incrementCurseCount(msg) {
	let id = msg.author.id;
	let author = msg.author.username;
	let date = new Date; //Timestamp by month
	let increment = admin.firestore.FieldValue.increment(1);

	let users_ref = db.collection("users").doc(id);
	let curse_ref = db.collection("curses").doc(id);

	let curseWords = filterMessage(msg.content); // Function located at the eof

	if (curseWords.length < 1) return;

	await users_ref.get().then((doc) => {
		if (!doc.exists) {
			users_ref.set({
				createdAt: date,
				username: author,
				total: 0
			}).catch((err) => {
				console.log(`Set error: users_ref:[${Date.now()}]\n ${err}`);
			});
		}
	});

	curseWords.forEach((curseWord) => {
		try {
			curse_ref.set({
				[curseWord]: increment
			}, {
				merge: true
			});

			users_ref.set({
				total: increment
			}, {
				merge: true
			});

			let newTracking = {
				createdAt: date,
				curseWord: curseWord,
				id: id,
				username: author,
				message: msg.content.trim()
			};
			let tracking_ref = db.collection("tracking").doc(); // Create new key
			tracking_ref.set(newTracking, {
				merge: true
			});
		} catch (err) {
			console.log(`Set error: Set block[${Date.now()}]\n ${err}`);
		}
	});
}

function filterMessage(text) {
	const badWords = require("./list/badwords.json");
	let regex = /!|@|#|\$|%|\^|&|\*|\(|\)|-|_|=|\+|\[|\{|\}|\]|;|:|'|"|,|<|\.|>|\/|\?|\\|\|/g;
	text = text.trim().toLowerCase().replace(regex, "").split(" "); //Getting rid of signs such as punctuations

	// Could've have used indexOf() instead but that would create a lot of false positives.
	let badBadWords = text.filter((word) => badWords.words.includes(word));

	return badBadWords;
}

module.exports = incrementCurseCount;