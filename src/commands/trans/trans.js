const path = require('path');
const request = require('request');
require('toml-require').install({ toml: require('toml') });

const CONFIG = require(path.join(process.cwd(), 'conf/user_config.toml'));

function translate(msg, args) {
  if (args.length < 1) return msg.channel.send('https://papago.naver.com/');
  yandex(msg);
}

function yandex(msg) {
  const text = msg.content.trim().slice(9); // Taking out !wc trans
  const uriText = encodeURI(text);
  const apiroute =
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${CONFIG.YANDEX_KEY}` +
    `&text=${uriText}&lang=en&hint=kr,jp,es&format=html&options=1`;

  request(apiroute, (err, res, body) => {
    if (err) return msg.channel.send(err);
    if (res.statusCode !== 200) return msg.channel.send('API responded with status ' + res.statusCode);

    body = JSON.parse(body).text;
    if (!body && body.length < 1) return msg.channel.send('No translation found.');

    let output = `<@${msg.author.id}> "${text}" translates to:\n>>> `;
    for (let i = 0; i < body.length; i++) {
      output += `${i + 1}. ${body[i]}\n`;
    }
    output += '\n Source from Yandex';

    msg.channel.send(output);
  });
}

module.exports = translate;
