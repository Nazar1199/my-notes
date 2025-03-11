<template>
  <header class="header">
    <div id="header-content">
      <div class="logo">
        <img src="/src/assets/icons/logo.svg" alt="Логотип" />
      </div>
      <div id="user-info" v-if="useUserGlobalInfoStore().isLoggedIn">
        <p class="text-small">{{ useUserGlobalInfoStore().userEmail }}</p>
        <MyButton
          class="button" id="user-avatar"
          :onClick="toggleTooltip"
          :iconName="$IconNames.User"
          :iconSize="$IconSizes.Large"
        />
        <div v-if="showTooltip" class="tooltip">
          <a @click="logout">Выйти</a>
        </div>
      </div>
      <MyButton v-if="!useUserGlobalInfoStore().isLoggedIn"
        class="button"
        :onClick="openLoginDialog"
        :iconName="$IconNames.Login"
        :iconSize="$IconSizes.Large"
        label="Вход"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage, removeUserInfoFromLocalStorage } from '../localStorage';
import { logoutUser } from '../api/auth';
import { useRouter } from 'vue-router';
import type { User } from '../models/User';
import { useUserGlobalInfoStore } from '../store';

const unAuth :User = {
  id: 0,
  email: '',
}
onMounted(() => {
  console.log('Header Смонтировано!');
})
const userGlobalInfo = ref(inject('userGlobalInfo'));
const showLoginDialog = inject('showLoginDialog');
const showTooltip = ref(false);
const router = useRouter();

const navigateToMain = () => router.push('/');

const logout = async () => {
  try {
    const accessToken = getTokenFromLocalStorage();
    if (accessToken) {
      await logoutUser(accessToken);
      removeTokenFromLocalStorage();
      removeUserInfoFromLocalStorage();
      useUserGlobalInfoStore().clearUser();
      userGlobalInfo.value = unAuth;
      showTooltip.value = false;
      navigateToMain();
    } else {
      console.error('Access token not found');
    }
  } catch (error) {
    console.error(String(error.message));
  }
};

const openLoginDialog = () => showLoginDialog.value = true;
const toggleTooltip = () => showTooltip.value = !showTooltip.value;
const userIsNotNull = () => userGlobalInfo.value.id !== 0;
</script>
  <style scoped>
  .tooltip {
    position: absolute;
    top: 80px;
    right: 20px;
    background-color: var(--dark-middle);
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 15px 46px rgba(0, 0, 0, 0.6);
    z-index: 10;
  }

.tooltip a {
  text-decoration: none;
}
  #user-info {
    display: flex;
    align-items: center;
    p {
      margin-right: 12px;
    }
    .button {
      max-height: 52px;
      max-width: 52px;
    }
  }
  #user-avatar {
    background-color: var(--dark-middle);
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
  img {
    height: 36px;
  }
  
  #header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: var(--dark);
  }
  
  @media (min-width: 768px) {
    #header-content {
      padding: 20px 40px;
    }
    img {
      height: 50px;
    }
  }
  
  @media (min-width: 1366px) {
    #header-content {
      padding: 20px 80px;
    }
  }
  
  @media (min-width: 1900px) {
    #header-content {
      padding: 40px 160px;
    }
  }
  
  </style>