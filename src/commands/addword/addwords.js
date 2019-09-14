const fs = require("fs");
const path = require("path");

function addWords(msg, words) {
	if (words.length < 1) return msg.channel.send("Please add some words.");

	// let filepath = path.join(__dirname, "../../list/badwords.json");
	let filepath = path.join(__dirname, "../../list", "badwords.json");
	fs.readFile(filepath, "utf8", (err, data) => {
		if (err) {
			msg.channel.send("Error reading file. Please contact the dev");
			return console.log(err);
		}

		let obj = JSON.parse(data);
		for (let i = 0; i < words.length; i++) {
			// Checking for repetition(?)... ~O(n^2)
			if (obj.words.includes(words[i])) break;
			obj.words.push(words[i] + "");
		}

		fs.writeFile(filepath, JSON.stringify(obj), (err) => {
			if (err) {
				msg.channel.send("Error writing into file. Please contact the dev");
				return console.log(err);
			}
			msg.channel.send("Successfully added.");
		});
	});

}

module.exports = addWords;