import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your firebase config here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const addDocument = async (collectionName: string, data: Record<string, unknown>) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (error: unknown) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getDocuments = async <T = Record<string, unknown>>(collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })) as T[];
  } catch (error: unknown) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};
