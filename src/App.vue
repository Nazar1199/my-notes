<script setup lang="ts">
import { ref, provide } from 'vue';
import NotesTestPage from './pages/NotesTestPage.vue';
import MyNotesPage from './pages/MyNotesPage.vue';
import HeaderComponent from './components/HeaderComponent.vue'
import MainPage from './pages/MainPage.vue';
import LoginDialog from './components/LoginDialog.vue';
import RegistrationDialog from './components/RegistrationDialog.vue';
import AddNoteDialog from './components/AddNoteDialog.vue';

const showLoginDialog = ref(false);
const showRegistrationDialog = ref(false);
const showAddNoteDialog = ref(false);

provide('showLoginDialog', showLoginDialog);
provide('showRegistrationDialog', showRegistrationDialog);
provide('showAddNoteDialog', showAddNoteDialog);
</script>

<template>
  <HeaderComponent/>
  <div id="app-content">
    <!-- <MainPage/> -->
    <MyNotesPage/>
    <!-- <NotesTestPage/> -->
  </div>
  <LoginDialog />
  <RegistrationDialog />
  <AddNoteDialog />
</template>

<style lang="css" scoped>
  #app-content {
    padding-top: 96px;
  }
    @media (min-width: 1900px) {
      #app-content {
        padding-top: 136px;
      }
    }
</style>