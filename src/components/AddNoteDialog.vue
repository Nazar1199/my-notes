<template>
    <MyDialog :visible="showAddNoteDialog" @close="closeAddNoteDialog">
        <template #header>
        <div class="header">
            <h2>Добавление заметки</h2>
        </div>
      </template>
      <template #content>
        <div class="content">
            <MyInputBox 
                id="note-name" 
                :value="noteNameValue" 
                @input="noteNameValue = $event"
                :maxLenght="100"
                label="Название заметки" 
                placeholder="Введите название"/>
            <MyTextArea 
                id="note-text" 
                :value="noteTextValue" 
                @input="noteTextValue = $event"
                :maxLenght="500"
                label="Текст заметки" 
                placeholder="Введите текст"/>
        </div>
      </template>
      <template #bottom>
        <div >
            <div class="bottom">
                <MyButton :onclick="addNewNote" label="Добавить"/>
            </div>
            <div v-if="errorMessage" id="errors-block">
                <p id="errors-text" class="text-small">{{ errorMessage }}</p>
            </div>
        </div>                
      </template>
    </MyDialog>
  </template>
  
  <script setup>
  import { ref, inject } from "vue";
  import { createNote } from "../api/notes";
  import { Note } from "../models/Note";
  import { getTokenFromLocalStorage } from "../localStorage";
  
  const emit = defineEmits(['noteCreated']);

  const showAddNoteDialog = inject('showAddNoteDialog');
  const errorMessage = ref("");
  const noteNameValue = ref("");
  const noteTextValue = ref("");
  
  const addNewNote = async () => {
  try {
    const createdNote = await createNote(
        getTokenFromLocalStorage(), 
        noteNameValue.value, 
        noteTextValue.value
    );
    const newNote = {
        id: createdNote.id,
        title: noteNameValue.value,
        content: noteTextValue.value,
    };

    emit('noteCreated', newNote);
    closeAddNoteDialog();
  } catch (error) {
    errorMessage.value = String(error.message);
  }
};

const clearForm = () => {
    errorMessage.value = "";
    noteNameValue.value = "";
    noteTextValue.value = "";
  }

  const closeAddNoteDialog = () => {
    showAddNoteDialog.value = false;
    clearForm();
  };
  </script>

<style lang="scss" scoped>
    #errors-text {
        color: var(--error-text)
    }
    #errors-block {
        margin-top: 20px;
        background-color: var(--error-background);
        border-radius: 24px;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-right: 20px;
        padding-left: 20px;
    }
    .header{
        display: flex;
    }
    .bottom {
        display: flex;
        flex-direction: column-reverse;
    }
    #note-name {
        margin-bottom: 16px;
    }
    @media (min-width: 768px) {
        .bottom {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: center;
        }
        #note-name {
            margin-bottom: 24px;
        }
    }
</style>