const sortObjByKeyValuesDesc = require("./sortObjByKeyValuesDesc");

function printObjToChannel(msg, obj) {
	if (Object.keys(obj) < 1) return msg.channel.send("No words found"); // TODO: Msg: No word between dates.

	let output = "";
	let sortedKeys = sortObjByKeyValuesDesc(obj);
	output = `<@${msg.mentions.users.firstKey()}> curse list:\n\`\`\``;
	sortedKeys.forEach((k) => {
		output += `${k}: ${obj[k]}\n`;
	});
	output += "```";
	msg.channel.send(output);
}

module.exports = printObjToChannel;