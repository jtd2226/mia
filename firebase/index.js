import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  const config = JSON.parse(process.env.FIREBASE_CONFIG);
  initializeApp({
    credential: cert(config),
  });
}

const app = getApp();

export const firestore = getFirestore(app);

const database = firestore;

export default database;
