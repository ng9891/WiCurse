const moment = require('moment');
const printObjToChannel = require('../../helper/printObjToChannel');
const queryByDate = require('../../helper/queryByDate');

/*
 * @param {Discord Obj} [msg] Contains context needed to process data.
 * @param {array} [args] Contain the arguments for "from"(arg[0]) data and optionals arguments for "to" date or words.
 */
async function getWordsFrom(msg, args) {
  const id = msg.mentions.users.firstKey();
  let countWords = {};
  let fromDate = moment(args[0].slice(2), 'YYYY-MM-DD'); // Take out 'f:'

  if (!fromDate.isValid()) return msg.channel.send('Invalid \'From\' Date. Please try again.');

  fromDate = fromDate.toDate();

  const queryArr = [];
  queryArr.push(
      {
        a: 'id',
        cmp_sign: '==',
        b: id,
      },
      {
        a: 'createdAt',
        cmp_sign: '>=',
        b: fromDate,
      }
  );

  // Checking if there is a 't:' argument
  if (args.length > 1) {
    if (args[1].startsWith('t:')) {
      // Query range f to t
      let toDate = moment(args[1].slice(2), 'YYYY-MM-DD'); // Take out 't:'

      if (!toDate.isValid()) return msg.channel.send('Invalid \'To\' Date. Please try again.');

      toDate = toDate.endOf('day').toDate();
      queryArr.push({
        a: 'createdAt',
        cmp_sign: '<=',
        b: toDate,
      });

      if (args.length > 2) {
        // Has Words.
        // Query f to t with words
        const words = args.slice(2);
        countWords = await queryByDate('tracking', queryArr, words);
      } else {
        // Doesnt have words.
        // Query f to t everything
        countWords = await queryByDate('tracking', queryArr);
      }
    } else {
      // Query f to now with words
      const words = args.slice(1);
      countWords = await queryByDate('tracking', queryArr, words);
    }
  } else {
    // Query f to now everything
    countWords = await queryByDate('tracking', queryArr);
  }

  printObjToChannel(msg, countWords);
}

module.exports = getWordsFrom;
