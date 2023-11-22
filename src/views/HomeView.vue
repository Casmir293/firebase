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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db, colRef } from "@/services/firebase";

const newBook = ref({ title: "", author: "" });
const oldBook = ref({ id: "" });

onMounted(async () => {
  try {
    const snapshot = await getDocs(colRef);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  } catch (err) {
    console.error(err.message);
  }
});

const addBook = async (e) => {
  e.preventDefault();

  try {
    await addDoc(colRef, {
      title: newBook.value.title,
      author: newBook.value.author,
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
</script>
