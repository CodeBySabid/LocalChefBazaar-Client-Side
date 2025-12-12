// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdkEeC5_p6vvH7D5hPVQ0JrA-e2hYH02c",
  authDomain: "final-project-48806.firebaseapp.com",
  projectId: "final-project-48806",
  storageBucket: "final-project-48806.firebasestorage.app",
  messagingSenderId: "993583124188",
  appId: "1:993583124188:web:740fb4feedca63a2b62e19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);