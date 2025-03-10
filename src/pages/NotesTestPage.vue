<template>
    <div>
        <MyInputBox/>
        <AddNoteDialog></AddNoteDialog>
      <!-- <Note
        v-for="(note, index) in notes"
        :key="index"
        v-model:title="note.title"
        v-model:text="note.text"
        @remove="removeNote(index)"
      />
      <MyButton label="Войти" :onClick="addNote" /> -->
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Note from "../components/Note.vue";
  import MyButton from "../components/UI/MyButton.vue";
import MyDialog from "../components/UI/MyDialog.vue";
import LoginDialog from "../components/LoginDialog.vue";
import AddNoteDialog from "../components/AddNoteDialog.vue";
  
  const notes = ref([
    { title: "Заметка 1", text: "Текст заметки 1" },
    { title: "Заметка 2", text: "Текст заметки 2" },
  ]);
  
  const removeNote = (index) => {
    notes.value.splice(index, 1);
  };
  
  const addNote = () => {
    notes.value.push({ title: "", text: "" });
  };
  </script>