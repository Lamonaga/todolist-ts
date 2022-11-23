import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrwGhNeqnGjaUiAj-yHSqBVRNGh_liOjU",
  authDomain: "lamonaga-61f46.firebaseapp.com",
  projectId: "lamonaga-61f46",
  storageBucket: "lamonaga-61f46.appspot.com",
  messagingSenderId: "547592466799",
  appId: "1:547592466799:web:e07b7b847d2305347f389a",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
