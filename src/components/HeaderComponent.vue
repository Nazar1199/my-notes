<template>
  <header class="header">
    <div id="header-content">
      <div class="logo">
        <img src="/public/resources/icons/logo.svg" alt="Логотип" />
      </div>
      <MyButton
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
import { inject } from 'vue';

const showLoginDialog = inject('showLoginDialog');

const openLoginDialog = () => {
  showLoginDialog.value = true;
};
</script>
  
  <style scoped>
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