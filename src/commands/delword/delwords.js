const fs = require("fs");
const path = require("path");

function delWords(msg, words) {
	if (words.length < 1) return msg.channel.send("Please add some words.");

	let filepath = path.join(__dirname, "../../list", "badwords.json");
	fs.readFile(filepath, "utf8", (err, data) => {
		if (err) {
			msg.channel.send("Error reading file. Please contact the dev");
			return console.log(err);
		}

		let obj = JSON.parse(data);

		let filtered = obj.words.filter(word => !words.includes(word));
		obj.words = filtered;

		fs.writeFile(filepath, JSON.stringify(obj), (err) => {
			if (err) {
				msg.channel.send("Error writing into file. Please contact the dev");
				return console.log(err);
			}
			msg.channel.send("Successfully deleted.\nKeep in mind it just stops tracking but doesnt not eliminate previous records.");
		});
	});

}

module.exports = delWords;