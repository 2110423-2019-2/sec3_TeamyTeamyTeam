import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCkhKU377R7lIiYBCwud0rXITQREbaDaxo",
    authDomain: "chatpromo-2a865.firebaseapp.com",
    databaseURL: "https://chatpromo-2a865.firebaseio.com",
    projectId: "chatpromo-2a865",
    storageBucket: "chatpromo-2a865.appspot.com",
    messagingSenderId: "1058969527050",
    appId: "1:1058969527050:web:0810a0c894f7c09da810f3",
    measurementId: "G-HP212SYC3N"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };