import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ1PNuutNqvMMIIpYsu_BjlwH3Yff31RI",
  authDomain: "project-cost-tracker-7fdc7.firebaseapp.com",
  projectId: "project-cost-tracker-7fdc7",
  storageBucket: "project-cost-tracker-7fdc7.firebasestorage.app",
  messagingSenderId: "40523177494",
  appId: "1:40523177494:web:1b1933827e657448a65f37"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);