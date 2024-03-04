// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlOVeNNPdHhngKM8XHkPjuJhzly05f5Lc",
  authDomain: "dtc11-70f41.firebaseapp.com",
  projectId: "dtc11-70f41",
  storageBucket: "dtc11-70f41.appspot.com",
  messagingSenderId: "384427724291",
  appId: "1:384427724291:web:ffd57db5d4109fda294836"
};


//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

