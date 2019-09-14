const {db} = require('../../db_service/firebase.js');

function getTotal(msg) {
  const usersRef = db.collection('users').doc(msg.mentions.users.firstKey());
  usersRef.get().then((doc) => {
    if (!doc.exists) return msg.channel.send(`<@${msg.mentions.users.firstKey()}> has not made any curses... yet.`);
    msg.channel.send(`<@${doc.id}> made a total of ${doc.data().total} curses`);
  });
}

module.exports = getTotal;
