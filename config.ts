import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
let {firebaseConfig} = require('./secrets');

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();