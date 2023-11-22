<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <section>
      <h1>HELLO, WORLD!</h1>

      <form class="add" @submit.prevent="addBook">
        <label for="title">Title:</label>
        <input type="text" name="title" required />
        <label for="author">Author:</label>
        <input type="text" name="author" required />

        <button>add a new book</button>
      </form>

      <form class="delete" @submit.prevent="deleteBook">
        <label for="id">Document id:</label>
        <input type="text" name="id" required />

        <button>delete a book</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { db, colRef, addDoc } from "@/services/firebase";

const addBook = (e) => {
  e.preventDefault();
};

const deleteBook = (e) => {
  e.preventDefault();
};
</script>
