<template>
    <div class="main-container">
      <div class="left-side">
        <div class="title">
          <h1>Мои заметки</h1>
        </div>
        <div class="sub-title">
          <h3>Не забывай о важном, храни его в облаке.</h3>
        </div>
      </div>
      <div class="right-side">
        <img src="/public/resources/pictures/main-page-picture.svg" alt="Main Page Picture" />
      </div>
    </div>
  </template>
  
<script>
import { getTokenFromLocalStorage } from "../localStorage";
import { useRouter } from 'vue-router';
const router = useRouter();
import { onMounted } from 'vue';
import { useUserGlobalInfoStore } from '../store';

onMounted(() => {
  const token = useUserGlobalInfoStore().isLoggedIn;
    if (token != "" && token != null) {
        console.log(true);
        const navigateToNotes = () => {
            router.push('/notes');
        };
        navigateToNotes();
    } else {
        console.log(false);
    }
});
</script>

  <style lang="scss" scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px; 
  }
  
  .title h1 {
    font-weight: 900; 
    text-align: center;
    margin-bottom: 10px;
  }
  
  .sub-title h3 {
    font-weight: 300;
    color: var(--gray);
    text-align: center;
    max-width: 400px;
    margin-bottom: 20px;
  }
  
  .right-side img {
    max-width: 100%;
    height: auto;
  }
  
  @media (min-width: 768px) {
    .main-container {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 40px;
    }
  
    .title h1,
    .sub-title h3 {
      text-align: left;
    }
  
    .sub-title h3 {
      max-width: 394px;
    }
  }
  
  @media (min-width: 1366px) {
    .main-container {
      padding: 60px;
    }
  }
  
  @media (min-width: 1900px) {
    .main-container {
      padding: 80px;
    }
  }
  </style>