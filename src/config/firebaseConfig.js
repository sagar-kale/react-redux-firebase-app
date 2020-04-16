// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import 'firebase/firestore'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyBXIGt_GqDKRVH_ndTvnFbgsFSzG46Z3d0",
    authDomain: "sgr-react-app.firebaseapp.com",
    databaseURL: "https://sgr-react-app.firebaseio.com",
    projectId: "sgr-react-app",
    storageBucket: "sgr-react-app.appspot.com",
    messagingSenderId: "220518352777",
    appId: "1:220518352777:web:039cac4d7e649e46138358",
    measurementId: "G-8PJWGKX12P"
};
firebase.initializeApp(config);
firebase.firestore();
firebase.analytics();

export default firebase;