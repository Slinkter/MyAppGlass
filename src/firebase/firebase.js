// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFcLiwNaXXdd2HLCCep3oYx-fwJTxGoxk",
  authDomain: "gya-reclamos.firebaseapp.com",
  projectId: "gya-reclamos",
  storageBucket: "gya-reclamos.firebasestorage.app",
  messagingSenderId: "335484412430",
  appId: "1:335484412430:web:183bfadb5dabe922b9525f",
  measurementId: "G-PTD8CL8H2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);