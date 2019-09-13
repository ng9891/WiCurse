const request = require("request");
require("dotenv").config();

function translate(msg) {
	yandex(msg);
}

function yandex(msg) {
	let text = msg.content.trim().slice(9); // Taking out !wc trans

	let uriText = encodeURI(text);
	let apiroute = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.YANDEX_KEY}
					&text=${uriText}&lang=en&hint=kr,jp,es&format=html&options=1`;

	request(apiroute, (err, res, body) => {
		if (err) return msg.channel.send(err);
		if (res.statusCode !== 200) return msg.channel.send("API responded with status " + res.statusCode);

		body = JSON.parse(body).text;
		if (!body && body.length < 1) return msg.channel.send("No translation found.");

		let output = `<@${msg.author.id}> "${text}" translates to:\n>>> `;
		for (let i = 0; i < body.length; i++) {
			output += `${i+1}. ${body[i]}\n`;
		}
		output += "\n Source from Yandex";

		msg.channel.send(output);
	});
}

module.exports = translate;