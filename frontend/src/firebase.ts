import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const app = initializeApp({
  apiKey: "fake-key", // any placeholder is fine for emulator
  projectId: "nyu-path-planner",
});

const db = getFirestore(app);

// 👇 This tells your frontend to hit localhost Firestore instead of cloud
if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080); // default port for Firestore emulator
}



export { db };