<template>
    <div class="notes-grid">
      <div class="note-item" v-for="item in notes" :key="item">
        <Note :title="item.title" :text="item.text"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Note from "../components/Note.vue";
  
  const notes = ref([
    { title: "Заметка 1", text: "Текст заметки 1" },
    { title: "Заметка 2", text: "Текст заметки 2" },
    { title: "Заметка 3", text: "Текст заметки 3" },
    { title: "Заметка 4", text: "Текст заметки 4" },
    { title: "Заметка 5", text: "Текст заметки 5" },
    { title: "Заметка 6", text: "Текст заметки 6" },
    { title: "Заметка 7", text: "Текст заметки 7" },
    { title: "Заметка 8", text: "Текст заметки 8" },
  ]);
  
  const removeNote = (index) => {
    notes.value.splice(index, 1);
  };
  
  const addNote = () => {
    notes.value.push({ title: "", text: "" });
  };
  </script>

  <style lang="css" scoped>
  .note-item {
    width: 100%;
  }
  .notes-grid {
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  @media (max-width: 1366px) {
    .notes-grid {
      gap: 20px;
    }
  }

  @media (max-width: 768px) {
    .notes-grid {
      grid-template-columns: 1fr; 
    }
}
</style>