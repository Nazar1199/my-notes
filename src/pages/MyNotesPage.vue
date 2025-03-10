<template>
  <div class="notes">
    <div class="notes-grid">
      <div class="note-item" v-for="item in notes" :key="item.id">
        <NoteItem 
          :title="item.title" 
          :text="item.content" 
          :id="item.id" 
          @remove="removeNote"/>
      </div>
    </div>
    <div class="add-button-container">
      <MyButton id="add-button" :iconName="$IconNames.Add" :onClick="openAddNoteDialog" />
    </div>
  </div>
  <AddNoteDialog @noteCreated="addNote"/>
  </template>
  
  <script setup>
  import { ref, inject } from "vue";
  import NoteItem from "../components/NoteItem.vue";
  import AddNoteDialog from "../components/AddNoteDialog.vue";
  import { getNotes, deleteNote } from "../api/notes";
  import { getTokenFromLocalStorage } from "../localStorage";
  import { useRouter } from 'vue-router';

  const showAddNoteDialog = inject('showAddNoteDialog');
  const notes = ref([]);
  const router = useRouter();

  const getMyNotes = async () => {
    try {
      const accessToken = getTokenFromLocalStorage();
      if (accessToken) {
        const fetchedNotes = await getNotes(accessToken);
        if (fetchedNotes) {
          notes.value = fetchedNotes;
        }
      } else {
        console.error('Access token not found');
        const navigateToMain = () => {
          router.push('/');
        };
        navigateToMain();
      }
    } catch (error) {
      console.error(String(error.message));
    }
  }
  getMyNotes();

  const openAddNoteDialog = () => {
    showAddNoteDialog.value = true;
  };
  
  const addNote = async (newNote) => {
    notes.value.push(newNote);
  };
  
  const removeNote = async (id) => {
    try {
      const accessToken = getTokenFromLocalStorage();
      if (accessToken) {
        await deleteNote(accessToken, id);
        notes.value = notes.value.filter(note => note.id !== id);
      } else {
        console.error('Access token not found');
        const navigateToMain = () => {
          router.push('/');
        };
        navigateToMain();
      }
    } catch (error) {
      console.error(String(error.message));
    }
  };
  </script>

  <style lang="css" scoped>
  .notes {
    /* width: 80vh;
    height: 80vh; */
  }
  .add-button-container {
    position: fixed;
    bottom: 40px;
    right: 8px;
    #add-button {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
  .note-item {
    width: 100%;
  }
  .notes-grid {
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
  @media (max-width: 768px) {
    .notes-grid {
      grid-template-columns: 1fr; 
    }
  }
  @media (max-width: 1366px) {
      .notes-grid {
        gap: 20px;
      }
    }
    @media (min-width: 1366px) {
      .add-button-container {
        right: 12px;
      }
  }
    @media (min-width: 1900px) {
      .add-button-container {
        right: 40px;
      }
  }
</style>