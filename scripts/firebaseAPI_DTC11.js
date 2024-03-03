//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyA2KuJgewEB-Wr4IuVFMKaJiypsspPuo1k",
  authDomain: "comp1800-d6473.firebaseapp.com",
  projectId: "comp1800-d6473",
  storageBucket: "comp1800-d6473.appspot.com",
  messagingSenderId: "941186638635",
  appId: "1:941186638635:web:212c5413a423a6a85adb6e"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
