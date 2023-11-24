<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <section>
      <h1>HELLO, WORLD!</h1>

      <form class="add" @submit.prevent="addBook">
        <label for="title">Title:</label>
        <input type="text" v-model="newBook.title" name="title" required />
        <label for="author">Author:</label>
        <input type="text" v-model="newBook.author" name="author" required />

        <button>add a new book</button>
      </form>

      <form class="delete" @submit.prevent="deleteBook">
        <label for="id">Document id:</label>
        <input type="text" v-model="oldBook.id" name="id" required />

        <button>delete a book</button>
      </form>
    </section>

    <section class="auth">
      <h1>Firebase Auth</h1>

      <form class="sign-up" @submit.prevent="submitForm">
        <label for="email">email:</label>
        <input type="email" name="email" v-model="email" />
        <label for="password">password:</label>
        <input type="password" name="password" v-model="password" />
        <button>sign up</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, colRef } from "@/services/firebase";

const newBook = ref({ title: "", author: "" });
const email = ref("");
const password = ref("");
const oldBook = ref({ id: "" });
const auth = getAuth();

// Queries
const q = query(
  colRef,
  where("author", "==", "Casmir Onyeka"),
  orderBy("title", "asc")
);

// Real Time Collection Data (Queries)
onMounted(() => {
  try {
    onSnapshot(q, (snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Real Time Collection Data
onMounted(() => {
  try {
    onSnapshot(colRef, (snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Collection Ref
// onMounted(async () => {
//   try {
//     const snapshot = await getDocs(colRef);
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

const addBook = async (e) => {
  e.preventDefault();

  try {
    await addDoc(colRef, {
      title: newBook.value.title,
      author: newBook.value.author,
      createdAt: serverTimestamp(),
    });

    newBook.value.title = "";
    newBook.value.author = "";
  } catch (error) {
    console.error(error.message);
  }
};

const deleteBook = async (e) => {
  e.preventDefault();

  try {
    const docRef = doc(db, "books", oldBook.value.id);
    await deleteDoc(docRef);
    oldBook.value.id = "";
  } catch (error) {
    console.error(error.message);
  }
};

const submitForm = async (e) => {
  e.preventDefault();

  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("User created:", cred.user);
    (email.value = ""), (password.value = "");
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};
</script>
