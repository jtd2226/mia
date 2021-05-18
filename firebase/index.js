import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const database = admin.app().firestore();
export default database;
