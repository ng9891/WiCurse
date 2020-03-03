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
  if (!cmd) return helpMsg(msg);

  switch (cmd) {
    case 'addword':
      console.log(`WiCurse: [${Date.now()}] addword.`);
      addWords(msg, args);
      break;
    case 'delword':
      console.log(`WiCurse: [${Date.now()}] delword.`);
      delWords(msg, args);
      break;
    case 'trans':
      console.log(`WiCurse: [${Date.now()}] trans.`);
      translate(msg, args);
      break;
    case 'get':
      console.log(`WiCurse: [${Date.now()}] get.`);
      getCommand(msg, args);
      break;
    case 'help':
      helpMsg(msg);
      break;
  }
}

module.exports = runCommand;
