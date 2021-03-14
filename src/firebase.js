import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCFAYS6dAW8VTober46jvYwc1uY5nW1TWQ",
    authDomain: "netflix-clone-8616e.firebaseapp.com",
    projectId: "netflix-clone-8616e",
    storageBucket: "netflix-clone-8616e.appspot.com",
    messagingSenderId: "658210379942",
    appId: "1:658210379942:web:231665e1b4ab8748cffc67"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth};
export default db;