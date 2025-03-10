<script setup lang="ts">
import NotesTestPage from './pages/NotesTestPage.vue';
import MyNotesPage from './pages/MyNotesPage.vue';
import HeaderComponent from './components/HeaderComponent.vue'
import MainPage from './pages/MainPage.vue';
</script>

<template>
  <HeaderComponent/>
  <div id="app-content">
    <!-- <MainPage/> -->
    <!-- <MyNotesPage/> -->
    <NotesTestPage/>
  </div>
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