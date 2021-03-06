const getAllWords = require('./getAllWords');
const getTotal = require('./getTotal');
const getByWords = require('./getByWords');
const getWordsFrom = require('./getWordsFrom');
const getWordsTo = require('./getWordsTo');

function getCommand(msg, args) {
  // Checking correct number of params
  if (msg.mentions.users.size === 0) return msg.channel.send('Please @ a user.');
  if (msg.mentions.users.size !== 1) return msg.channel.send('Only one @ permitted.');

  const userId = args[0].match(/\d+/)[0];
  const mention = msg.mentions.users.firstKey();
  if (userId !== mention) return msg.channel.send('Incorrect @User order. Use `!wc help` for more information.');

  // When arguments are empty
  if (!args[1]) return getAllWords(msg);
  if (args[1].startsWith('f:')) return getWordsFrom(msg, args.slice(1)); // Get rid of <@userid>
  if (args[1].startsWith('t:')) return getWordsTo(msg, args.slice(1)); // Get rid of <@userid>
  if (args[1].startsWith('total')) return getTotal(msg);

  getByWords(msg, args.slice(1)); // Get rid of <@userid>
}

module.exports = getCommand;
