import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA82RGjsgt6-uZ6P19LuECCZ_nL4e8IDrI",
    authDomain: "react-in-depth.firebaseapp.com",
    projectId: "react-in-depth",
    storageBucket: "react-in-depth.appspot.com",
    messagingSenderId: "25095294271",
    appId: "1:25095294271:web:d177c6186cd02f182a178a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;