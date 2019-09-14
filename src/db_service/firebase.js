const admin = require('firebase-admin');
const serviceAccount = require('../../wicurse-36db057e6492.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {
  db: db,
  admin: admin,
};
