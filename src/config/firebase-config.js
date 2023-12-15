// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoQdGnYysm3r7OX8eKk7ZRdISe5OXu9-Y",
  authDomain: "expensetracker-9bb86.firebaseapp.com",
  projectId: "expensetracker-9bb86",
  storageBucket: "expensetracker-9bb86.appspot.com",
  messagingSenderId: "718475632566",
  appId: "1:718475632566:web:f4c94705bc3d2641d26b17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const provider=new GoogleAuthProvider();

export const db=getFirestore(app);