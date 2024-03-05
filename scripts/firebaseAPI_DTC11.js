
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAUMZyizWfl6D6kAEXYTmV0149rP9P11GU",
  authDomain: "dtc11-project.firebaseapp.com",
  projectId: "dtc11-project",
  storageBucket: "dtc11-project.appspot.com",
  messagingSenderId: "1077348206400",
  appId: "1:1077348206400:web:1e7b051711502dd9b5dca5"
};




//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

