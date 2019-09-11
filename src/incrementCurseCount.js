const moment = require("moment");
const badWords = require("./badwords.json");
const db = require("./db_service/firebaseInit");
const admin = require("firebase-admin");

function incrementCurseCount(msg) {
	let id = msg.author.id;
	let author = msg.author.username;
	let date = moment(msg.createdTimestamp).startOf("month");
	date = moment(date).valueOf(); //Timestamp by month
	let increment = admin.firestore.FieldValue.increment(1);

	let ref = db.collection("tracking").doc(id);
	let byDate_ref = ref.collection("curses").doc("byDate");
	let total_ref = ref.collection("curses").doc("total");

	ref.set({
		username: author
	});

	let curseWords = getCurseWords(msg.content);

	if (curseWords.length < 1) return;

	curseWords.forEach((curseWord) => {
		byDate_ref.set({
			[date]: {
				[curseWord]: increment
			}
		}, {
			merge: true
		});

		total_ref.set({
			[curseWord]: increment
		}, {
			merge: true
		});
	});
}

function getCurseWords(msg) {
	msg = msg.toLowerCase();
	let regex = /\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\=|\+|\[|\{|\}|\]|\;|\:|\'|\"|\,|\<|\.|\>|\/|\?|\\|\|/g;
	msg = msg.replace(regex, ""); //Getting rid of signs such as punctuations
	msg = msg.split(" ");

	let badBadWords = msg.filter((word) => badWords.words.includes(word));

	return badBadWords;
}

module.exports = incrementCurseCount;