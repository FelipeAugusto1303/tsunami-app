// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJnXLoggRzo88i2mhnQAN3bxZ-ahxjU6A",
  authDomain: "tsunami-metrifier.firebaseapp.com",
  projectId: "tsunami-metrifier",
  storageBucket: "tsunami-metrifier.firebasestorage.app",
  messagingSenderId: "316278188578",
  appId: "1:316278188578:web:38237ce1b08b65b15df87b",
  measurementId: "G-J1DD2WXE83"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);