import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyATdiKup7QLvNRx0IamfPaefA4ex8hY2CM",
    authDomain: "ecommerce-app-6264b.firebaseapp.com",
    projectId: "ecommerce-app-6264b",
    storageBucket: "ecommerce-app-6264b.appspot.com",
    messagingSenderId: "478196676054",
    appId: "1:478196676054:web:f22693c4b5e59b4e39a077",
    measurementId: "G-F3S8CZN35P"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const fs = firebase.firestore()
const storage = firebase.storage()

export {auth, fs, storage}