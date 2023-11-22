import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDa6K26zQCeqtSiqCcHTGKL98FClH9TUEs",
  authDomain: "polished-talon-393921.firebaseapp.com",
  projectId: "polished-talon-393921",
  storageBucket: "polished-talon-393921.appspot.com",
  messagingSenderId: "827368481395",
  appId: "1:827368481395:web:52ea5d0baff133da8f0006",
};

// Initialize firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore();

// Collection ref
const colRef = collection(db, "books");

export { db, colRef };
