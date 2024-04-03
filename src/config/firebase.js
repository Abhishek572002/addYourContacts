// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOTR8i8lb-tZlc_wchgj7nHWhuM3HOqG4",
  authDomain: "addcontact-aac71.firebaseapp.com",
  projectId: "addcontact-aac71",
  storageBucket: "addcontact-aac71.appspot.com",
  messagingSenderId: "628177584494",
  appId: "1:628177584494:web:36bbffbd9c29ede500017f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);