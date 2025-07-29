import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Check if we're using the emulator
if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log("✅ Connected to Firestore Emulator:", process.env.FIRESTORE_EMULATOR_HOST);
  // Use the same project ID as your Firebase project (check firebase.json)
  initializeApp({ projectId: 'path-planner-nyu' }); // or whatever your project ID is
} else {
  console.warn("⚠️ You are NOT connected to the Firestore Emulator.");
  console.warn("⚠️ Make sure to run 'firebase emulators:start' first!");
  initializeApp();
}

export const db = getFirestore();