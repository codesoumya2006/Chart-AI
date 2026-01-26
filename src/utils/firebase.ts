import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import type { AppState } from '../types';

// Firebase configuration from environment variables
// These values must be set in .env.local or Vercel environment variables
const validateFirebaseConfig = (): void => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];

  const missing: string[] = [];
  requiredVars.forEach(varName => {
    const value = import.meta.env[varName as keyof ImportMetaEnv];
    if (!value) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    const errorMsg = `Firebase configuration is incomplete. Missing environment variables:\n${missing
      .map(v => `  - ${v}`)
      .join('\n')}\n\nPlease check your .env.local or Vercel environment variables.`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

// Initialize Firebase only once
let firebaseApp: ReturnType<typeof initializeApp> | null = null;
let auth: any = null;
let db: any = null;
let initError: Error | null = null;

const initializeFirebase = () => {
  // Check if Firebase is already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    firebaseApp = existingApps[0];
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    return;
  }

  try {
    // Validate configuration before initialization
    validateFirebaseConfig();

    // Initialize Firebase
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  } catch (error) {
    initError = error instanceof Error ? error : new Error(String(error));
    console.error('[Firebase Init Error]', initError.message);
  }
};

// Initialize Firebase immediately
initializeFirebase();

// Export a getter function to check initialization status
export const getFirebaseError = (): Error | null => initError;
export const isFirebaseInitialized = (): boolean => firebaseApp !== null && auth !== null && db !== null;

export { firebaseApp, auth, db };

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in anonymously
 * Used for allowing users to try the app without authentication
 */
export const signInAnonymouslyUser = async () => {
  if (!auth || !firebaseApp) {
    const error = 'Firebase is not initialized. Please check your configuration.';
    console.error('[Auth]', error);
    throw new Error(error);
  }
  try {
    console.log('[Auth] Signing in anonymously...');
    const result = await signInAnonymously(auth);
    console.log('[Auth] Anonymous sign-in successful');
    return result.user;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Auth] Anonymous sign-in failed:', message);
    throw new Error(`Sign-in failed: ${message}`);
  }
};

/**
 * Sign in with Google
 * Opens a popup for Google authentication
 */
export const signInWithGoogle = async () => {
  if (!auth || !firebaseApp) {
    const error = 'Firebase is not initialized. Please check your configuration.';
    console.error('[Auth]', error);
    throw new Error(error);
  }
  try {
    console.log('[Auth] Opening Google sign-in popup...');
    const result = await signInWithPopup(auth, googleProvider);
    console.log('[Auth] Google sign-in successful');
    return result.user;
  } catch (error) {
    const errorCode = (error as any)?.code || 'unknown';
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Auth] Google sign-in failed:', errorCode, message);
    
    // Provide user-friendly error messages for common issues
    if (errorCode === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked. Please allow popups for this site.');
    } else if (errorCode === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in cancelled.');
    } else if (errorCode === 'auth/configuration-not-found') {
      throw new Error('Firebase configuration not found. Please check environment variables.');
    }
    
    throw new Error(`Google sign-in failed: ${message}`);
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async () => {
  if (!auth || !firebaseApp) {
    const error = 'Firebase is not initialized. Please check your configuration.';
    console.error('[Auth]', error);
    throw new Error(error);
  }
  try {
    console.log('[Auth] Signing out...');
    await signOut(auth);
    console.log('[Auth] Sign-out successful');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Auth] Sign-out failed:', message);
    throw new Error(`Sign-out failed: ${message}`);
  }
};

/**
 * Listen to authentication state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!auth || !firebaseApp) {
    console.error('[Auth] Firebase is not initialized, cannot watch auth state');
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  console.log('[Auth] Setting up auth state listener');
  return onAuthStateChanged(auth, callback);
};

// Firestore functions for saving flows
export interface SavedFlow {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  flowData: AppState;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export const saveFlowToFirebase = async (flowData: AppState, title: string, description?: string, tags?: string[]): Promise<string> => {
  if (!auth || !db || !firebaseApp) {
    throw new Error('Firebase is not initialized. Please check your configuration.');
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to save flows');
  }

  try {
    console.log('[Firestore] Saving flow:', title);
    const flowDoc = {
      userId: user.uid,
      title,
      description: description || '',
      flowData,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: tags || []
    };

    const docRef = await addDoc(collection(db, 'flows'), flowDoc);
    console.log('[Firestore] Flow saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving flow to Firebase:', error);
    throw error;
  }
};

export const updateFlowInFirebase = async (flowId: string, flowData: AppState, title?: string, description?: string, tags?: string[]): Promise<void> => {
  if (!auth || !db || !firebaseApp) {
    throw new Error('Firebase is not initialized. Please check your configuration.');
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to update flows');
  }

  try {
    console.log('[Firestore] Updating flow:', flowId);
    const flowRef = doc(db, 'flows', flowId);
    const updateData: any = {
      flowData,
      updatedAt: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (tags !== undefined) updateData.tags = tags;

    await updateDoc(flowRef, updateData);
    console.log('[Firestore] Flow updated successfully');
  } catch (error) {
    console.error('[Firestore] Error updating flow:', error);
    throw error;
  }
};

export const loadFlowFromFirebase = async (flowId: string): Promise<SavedFlow | null> => {
  if (!auth || !db || !firebaseApp) {
    throw new Error('Firebase is not initialized. Please check your configuration.');
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to load flows');
  }

  try {
    console.log('[Firestore] Loading flow:', flowId);
    const flowRef = doc(db, 'flows', flowId);
    const flowSnap = await getDoc(flowRef);

    if (!flowSnap.exists()) {
      console.warn('[Firestore] Flow not found:', flowId);
      return null;
    }

    const data = flowSnap.data();
    if (data.userId !== user.uid) {
      throw new Error('You do not have permission to access this flow');
    }

    console.log('[Firestore] Flow loaded successfully');
    return {
      id: flowSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    } as SavedFlow;
  } catch (error) {
    console.error('Error loading flow from Firebase:', error);
    throw error;
  }
};

export const getUserFlows = async (): Promise<SavedFlow[]> => {
  if (!auth || !db || !firebaseApp) {
    throw new Error('Firebase is not initialized. Please check your configuration.');
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to load flows');
  }

  try {
    console.log('[Firestore] Loading user flows');
    // First, get all flows for the user (without ordering)
    const q = query(
      collection(db, 'flows'),
      where('userId', '==', user.uid)
    );

    const querySnapshot = await getDocs(q);
    const flows = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as SavedFlow[];

    // Sort client-side by updatedAt (most recent first)
    const sorted = flows.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    console.log('[Firestore] Loaded', sorted.length, 'flows');
    return sorted;
  } catch (error) {
    console.error('[Firestore] Error loading user flows:', error);
    throw error;
  }
};

export const searchUserFlows = async (searchTerm: string): Promise<SavedFlow[]> => {
  if (!auth || !db || !firebaseApp) {
    throw new Error('Firebase is not initialized. Please check your configuration.');
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to search flows');
  }

  try {
    console.log('[Firestore] Searching flows for:', searchTerm);
    // Get all user flows first (without ordering to avoid index requirement)
    const q = query(
      collection(db, 'flows'),
      where('userId', '==', user.uid)
    );

    const querySnapshot = await getDocs(q);
    const allFlows = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as SavedFlow[];

    // Client-side filtering for title, description, and tags
    const searchLower = searchTerm.toLowerCase();
    const filtered = allFlows.filter(flow => 
      flow.title.toLowerCase().includes(searchLower) ||
      flow.description?.toLowerCase().includes(searchLower) ||
      flow.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );

    // Sort by updatedAt (most recent first)
    console.log('[Firestore] Found', filtered.length, 'matching flows');
    return filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  } catch (error) {
    console.error('[Firestore] Error searching flows:', error);
    throw error;
  }
};

export const deleteFlowFromFirebase = async (flowId: string): Promise<void> => {
  if (!auth || !db || !firebaseApp) {
    throw new Error('Firebase is not initialized. Please check your configuration.');
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to delete flows');
  }

  try {
    console.log('[Firestore] Deleting flow:', flowId);
    // Verify ownership
    const flow = await loadFlowFromFirebase(flowId);
    if (!flow || flow.userId !== user.uid) {
      throw new Error('You do not have permission to delete this flow');
    }

    await deleteDoc(doc(db, 'flows', flowId));
    console.log('[Firestore] Flow deleted successfully');
  } catch (error) {
    console.error('[Firestore] Error deleting flow:', error);
    throw error;
  }
};

