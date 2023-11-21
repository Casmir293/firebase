import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
