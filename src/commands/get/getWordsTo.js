const moment = require("moment");
const printObjToChannel = require("../../helper/printObjToChannel");
const queryByDate = require("../../helper/queryByDate");

/*
 * @param {Discord Obj} [msg] Contains context needed to process data.
 * @param {array} [args] Contain the arguments for "to"(arg[0]) date and optional words.
 */
async function getWordsTo(msg, args) {
	let id = msg.mentions.users.firstKey();
	let countWords = {};
	let toDate = moment(args[0].slice(2), "YYYY-MM-DD"); // Take out 't:'

	if (!toDate.isValid()) return msg.channel.send("Invalid Date. Please try again.");

	toDate = toDate.endOf("day").toDate();

	let queryArr = [];
	queryArr.push({
		a: "id",
		cmp_sign: "==",
		b: id
	}, {
		a: "createdAt",
		cmp_sign: "<=",
		b: toDate
	});

	if (args.length > 1) {
		// Has words
		let words = args.slice(1);
		countWords = await queryByDate("tracking", queryArr, words);
	} else {
		// get everything from beginning to toDate
		countWords = await queryByDate("tracking", queryArr);
	}

	printObjToChannel(msg, countWords);
}

module.exports = getWordsTo;