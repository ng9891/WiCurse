const {db} = require('../db_service/firebase');
async function queryByDate(collection, arr, words) {
  const countWords = {};
  let query = db.collection(collection);
  for (let i = 0; i < arr.length; i++) {
    query = query.where(arr[i].a, arr[i].cmp_sign, arr[i].b);
  }

  if (words) {
    await Promise.all(
        words.map(async (word) => {
          const snapshot = await query.where('curseWord', '==', word).get();
          countWords[word] = snapshot.size;
        })
    );
  } else {
    const snapshot = await query.get();
    snapshot.forEach((doc) => {
      if (!countWords[doc.data().curseWord]) countWords[doc.data().curseWord] = 1;
      else countWords[doc.data().curseWord] += 1;
    });
  }

  return countWords;
}

module.exports = queryByDate;
