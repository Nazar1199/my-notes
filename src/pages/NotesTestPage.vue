<template>
    <div>
        <MyInputBox/>
        <AddNoteDialog></AddNoteDialog>
      <!-- <NoteItem
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
  import NoteItem from "../components/NoteItem.vue";
  import { Note } from "../models/Note";
  import MyButton from "../components/UI/MyButton.vue";
import MyDialog from "../components/UI/MyDialog.vue";
import LoginDialog from "../components/LoginDialog.vue";
import AddNoteDialog from "../components/AddNoteDialog.vue";
  
  const notes = ref([
    { title: "Заметка 1", text: "Текст заметки 1" },
    { title: "Заметка 2", text: "Текст заметки 2" },
  ]);
  
  notesObj: Note = [
  {
    id: 1,
    title: 'Короткая заметка',
    content: 'Это короткая заметка.',
  },
  {
    id: 2,
    title: 'Средняя заметка',
    content:
      'Это заметка средней длины, которая содержит несколько предложений.',
  },
  {
    id: 3,
    title: 'Длинная заметка',
    content: `Это длинная заметка, которая содержит много текста. 
    Она нужна для демонстрации того, как компонент будет отображать 
    заметки с большим объемом содержимого. 
    Здесь можно писать все, что угодно, и это будет отображаться.`,
  },
  {
    id: 4,
    title: 'Заметка с числами',
    content: '1 2 3 4 5 6 7 8 9 10',
  },
  {
    id: 5,
    title: 'Заметка со спецсимволами',
    content: '!@#$%^&*()_+=-`~[]{};:\'"\\|,.<>/?',
  },
  {
    id: 6,
    title: 'Заметка с переносами строк',
    content: `Первая строка.
Вторая строка.
Третья строка.`,
  },
  {
    id: 7,
    title: 'Очень длинная заметка',
    content: `Это очень длинная заметка, которая занимает много места. 
    Она нужна для тестирования того, как компонент будет обрабатывать 
    очень большие объемы текста. 
    Здесь можно писать бесконечно, и это будет отображаться.`,
  },
  {
    id: 8,
    title: 'Заметка с разными типами данных',
    content: `Текст: "Привет, мир!"
Число: 42
Булево значение: true
Массив: [1, 2, 3]
Объект: { name: "Иван", age: 30 }`,
  },
];

  const removeNote = (index) => {
    notes.value.splice(index, 1);
  };
  
  const addNote = () => {
    notes.value.push({ title: "", text: "" });
  };
  </script>