// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF74J6VCJzjTrZ7ETV_lIDzBb-1ZeywuY",
  authDomain: "instagramapp-765e5.firebaseapp.com",
  projectId: "instagramapp-765e5",
  storageBucket: "instagramapp-765e5.firebasestorage.app",
  messagingSenderId: "210789534890",
  appId: "1:210789534890:web:c8cbecb9069db6f1f294d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}