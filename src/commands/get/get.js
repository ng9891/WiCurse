const getAllWords = require('./getAllWords');
const getTotal = require('./getTotal');
const getByWords = require('./getByWords');
const getWordsFrom = require('./getWordsFrom');
const getWordsTo = require('./getWordsTo');

function getCommand(msg, args) {
  // Checking correct number of params
  if (msg.mentions.users.size !== 1) return msg.channel.send('Please @user in the correct order or only 1.');

  const userId = args[0].slice(2, -1);
  const mention = msg.mentions.users.firstKey();
  if (userId !== mention) return msg.channel.send('Invalid @username.');

  // When arguments are empty
  if (!args[1]) return getAllWords(msg);
  if (args[1].startsWith('f:')) return getWordsFrom(msg, args.slice(1)); // Get rid of <@userid>
  if (args[1].startsWith('t:')) return getWordsTo(msg, args.slice(1)); // Get rid of <@userid>
  if (args[1].startsWith('total')) return getTotal(msg);

  getByWords(msg, args.slice(1)); // Get rid of <@userid>
}

module.exports = getCommand;
