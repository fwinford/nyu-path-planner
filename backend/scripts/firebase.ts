import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Connect to emulator if available
if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log('🔧 Connected to Firestore Emulator');
  // For emulator, we can use a test project ID
  initializeApp({ projectId: 'demo-project' });
} else {
  console.warn('⚠️ You are not connected to the Firestore Emulator!');
  // For production, you'd need proper credentials
  initializeApp();
}

export const db = getFirestore();