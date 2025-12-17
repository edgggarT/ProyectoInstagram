// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export {auth}