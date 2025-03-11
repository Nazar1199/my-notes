<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue'
import LoginDialog from './components/LoginDialog.vue';
import RegistrationDialog from './components/RegistrationDialog.vue';
import { User } from './models/User';
import { getUserInfoFromLocalStorage } from './localStorage';
import { useUserGlobalInfoStore } from "./store";

const showLoginDialog = ref(false);
const showRegistrationDialog = ref(false);
const showAddNoteDialog = ref(false);

const unAuth :User = {
  id: 0,
  email: '',
}
const userInfoFromStorage = getUserInfoFromLocalStorage();

const userGlobalInfo = ref<User>(userInfoFromStorage ? JSON.parse(userInfoFromStorage) : unAuth);
  const isReady = ref(false);


onMounted(() => {
  isReady.value = true;
  const userGlobalInfo = useUserGlobalInfoStore();
  // userGlobalInfo.syncUserWithLocalStorage();
})
provide('showLoginDialog', showLoginDialog);
provide('showRegistrationDialog', showRegistrationDialog);
provide('showAddNoteDialog', showAddNoteDialog);
provide('userGlobalInfo', userGlobalInfo);
</script>

<template>
  <HeaderComponent v-if="isReady" />
  <div id="app-content">
    <router-view/>
  </div>
  <RegistrationDialog />
  <LoginDialog />
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