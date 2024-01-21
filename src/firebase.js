// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-realtor-70a88.firebaseapp.com",
  projectId: "react-realtor-70a88",
  storageBucket: "react-realtor-70a88.appspot.com",
  messagingSenderId: "257047577977",
  appId: "1:257047577977:web:74773b159ec84b81241ba8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
