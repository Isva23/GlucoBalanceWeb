// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHa0X7nblWR9quBRz5WWG-mBDxXSIXj_I",
  authDomain: "glucobalance-4e212.firebaseapp.com",
  projectId: "glucobalance-4e212",
  storageBucket: "glucobalance-4e212.appspot.com",
  messagingSenderId: "853368069938",
  appId: "1:853368069938:web:7d5738f399c0798920012b",
  measurementId: "G-RP8WNG82CN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

//funtions
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await deleteDoc(docRef)
    console.log('Documento eliminado con éxito')
  } catch (error) {
    console.error('Error al eliminar el documento: ', error)
  }
}
