import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAGivfPTjPsBGTAgJ_dwnLek35s1WvNR_A",
    authDomain: "dinedrop-1f108.firebaseapp.com",
    projectId: "dinedrop-1f108",
    storageBucket: "dinedrop-1f108.appspot.com",
    messagingSenderId: "510293285656",
    appId: "1:510293285656:web:c6ce42a1a042396ce35c6d",
    measurementId: "G-P3WDMGQGF1"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
