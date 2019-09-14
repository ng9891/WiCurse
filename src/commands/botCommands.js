/* eslint-disable indent */
const getCommand = require('./get/get');
const translate = require('./trans/trans');
const addWords = require('./addword/addwords');
const delWords = require('./delword/delwords');
const helpMsg = require('../helper/helpMsg');

function runCommand(msg) {
  const splitMsg = msg.content.toLowerCase().trim().split(' ');
  const cmd = splitMsg[1];
  const args = splitMsg.slice(2);

  if (msg.channel.type === 'dm') return msg.channel.send('Sorry commands not available on DMs');

  switch (cmd) {
    case 'addword':
      addWords(msg, args);
      break;
    case 'delword':
      delWords(msg, args);
      break;
    case 'trans':
      translate(msg, args);
      break;
    case 'get':
      getCommand(msg, args);
      break;
    case 'help':
      helpMsg(msg);
      break;
  }
}

module.exports = runCommand;
