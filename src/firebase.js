import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyCyGReegrjan4U8iBGcit8uJuYjcqmOcEU",
    authDomain: "bloodhaze-messanger.firebaseapp.com",
    databaseURL: "https://bloodhaze-messanger.firebaseio.com",
    projectId: "bloodhaze-messanger",
    storageBucket: "bloodhaze-messanger.appspot.com",
    messagingSenderId: "54188586525",
    appId: "1:54188586525:web:93352a53dbee8768edf8f4",
    measurementId: "G-CTGM56YB6R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;