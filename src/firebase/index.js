import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAaBc1rCwMu6GYK0HPLB3arWuC3llVCTh4",
  authDomain: "phomo-image.firebaseapp.com",
  databaseURL: "https://phomo-image.firebaseio.com",
  projectId: "phomo-image",
  storageBucket: "phomo-image.appspot.com",
  messagingSenderId: "857491992572",
  appId: "1:857491992572:web:1d2f8dc141160cd2678c79",
  measurementId: "G-BLW3JNXN5G"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
