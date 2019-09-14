// const moment = require("moment");
const {db, admin} = require('./db_service/firebase');

async function incrementCurseCount(msg) {
  const id = msg.author.id;
  const author = msg.author.username;
  const date = new Date(); // Timestamp by month
  const increment = admin.firestore.FieldValue.increment(1);

  const usersRef = db.collection('users').doc(id);
  const cursesRef = db.collection('curses').doc(id);

  const curseWords = filterMessage(msg.content); // Function located at the eof

  if (curseWords.length < 1) return;

  await usersRef.get().then((doc) => {
    if (!doc.exists) {
      usersRef
          .set({
            createdAt: date,
            username: author,
            total: 0,
          })
          .catch((err) => {
            console.log(`Set error: users_ref:[${Date.now()}]\n ${err}`);
          });
    }
  });

  curseWords.forEach((curseWord) => {
    try {
      cursesRef.set(
          {
            [curseWord]: increment,
          },
          {
            merge: true,
          }
      );

      usersRef.set(
          {
            total: increment,
          },
          {
            merge: true,
          }
      );

      const newTracking = {
        createdAt: date,
        curseWord: curseWord,
        id: id,
        username: author,
        message: msg.content.trim(),
      };
      const trackingRef = db.collection('tracking').doc(); // Create new key
      trackingRef.set(newTracking, {
        merge: true,
      });
    } catch (err) {
      console.log(`Set error: Set block[${Date.now()}]\n ${err}`);
    }
  });
}

function filterMessage(text) {
  const badWords = require('./list/badwords.json');
  const regex = /!|@|#|\$|%|\^|&|\*|\(|\)|-|_|=|\+|\[|\{|\}|\]|;|:|'|"|,|<|\.|>|\/|\?|\\|\|/g;
  const cleanText = text.trim().toLowerCase().replace(regex, '').split(' '); // Getting rid of signs such as punctuations

  // Could've have used indexOf() instead but that would create a lot of false positives.
  const badBadWords = cleanText.filter((word) => badWords.words.includes(word));

  return badBadWords;
}

module.exports = incrementCurseCount;
