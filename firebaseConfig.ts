    // firebaseConfig.ts

import { getAuth } from 'firebase/auth';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLvB9nqPPujeW5KrU_TWEHjKEbbsvZvM8",
  authDomain: "gramurja-cee34.firebaseapp.com",
  projectId: "gramurja-cee34",
  storageBucket: "gramurja-cee34.firebasestorage.app",
  messagingSenderId: "56834207475",
  appId: "1:56834207475:web:a510b4605cb36abbd3d186"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
