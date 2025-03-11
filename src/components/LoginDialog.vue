<template>
    <MyDialog :visible="showLoginDialog" @close="closeLoginDialog">
      <template #header>
        <div class="header">
            <h2>Вход в ваш аккаунт</h2>
        </div>
      </template>
      <template #content>
        <div class="content">
            <MyInputBox 
                id="email" 
                :value="loginValue" 
                @input="loginValue = $event"
                label="Email" 
                placeholder="Введите Email"/>
            <MyInputBox 
                id="password" 
                :value="passwordValue" 
                @input="passwordValue = $event"
                label="Пароль" 
                placeholder="Введите пароль"/>
        </div>
      </template>
      <template #bottom>
        <div >
            <div class="bottom">
                <div class="registration-container">
                    <p class="text-small">У вас нет аккаунта?</p>
                    <a class="text-small-bold" @click="openRegistrationDialog">Зарегистрируйтесь</a>
                </div>
                <MyButton :onclick="login" label="Войти"/>
            </div>
            <div v-if="errorMessage" id="errors-block">
                <p id="errors-text" class="text-small">{{ errorMessage }}</p>
            </div>
        </div>                
      </template>
    </MyDialog>
  </template>
  
  <script setup lang="ts">
import { ref, inject, watch } from 'vue';
import { loginUser, getUserInfo } from '../api/auth';
import { useRouter } from 'vue-router';
import { getTokenFromLocalStorage, getUserInfoFromLocalStorage } from '../localStorage';
import type { User } from '../models/User';
import { useUserGlobalInfoStore } from '../store';

const userGlobalInfo = inject('userGlobalInfo');
console.log('LoginDialog: userGlobalInfo injected with:', userGlobalInfo);

const showLoginDialog = ref(inject('showLoginDialog'));
const showRegistrationDialog = inject('showRegistrationDialog');
const errorMessage = ref('');
const loginValue = ref('');
const passwordValue = ref('');
const router = useRouter();

const navigateToNotes = () => router.push('/notes');

watch(showLoginDialog, (newValue) => {
  if (newValue) {
    console.log('Value is available:', newValue);
  }
});

const login = async () => {
  try {
    await loginUser(loginValue.value, passwordValue.value);
    await getUserInfo(getTokenFromLocalStorage());
    setUserGlobalInfo(loginValue.value);
    errorMessage.value = '';
    closeLoginDialog();
    navigateToNotes();
  } catch (error) {
    errorMessage.value = String(error.message);
  }
};

const clearForm = () => {
  errorMessage.value = '';
  loginValue.value = '';
  passwordValue.value = '';
};

const openRegistrationDialog = () => {
  showRegistrationDialog.value = true;
  closeLoginDialog();
};

const setUserGlobalInfo = (logginedUserEmail: string) => {
    try {
    useUserGlobalInfoStore().login()
    useUserGlobalInfoStore().setEmail(logginedUserEmail)
    // userGlobalInfo.setId(logginedUser.id)
    } catch { }
    clearForm();
};

const closeLoginDialog = () => {
  showLoginDialog.value = false;
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
    #email {
        margin-bottom: 16px;
    }
    .registration-container {
        display: flex;
        height: 24px;
        justify-content: center;
        align-items: center;
        margin-top: 12px;
        p {
            color: var(--gray);
            margin: 0px;
            margin-right: 4px;
        }
    }
    @media (min-width: 768px) {
        .bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        #email {
            margin-bottom: 24px;
        }
        .registration-container {
            display: flex;
            justify-content: center;
            margin-top: 0px;
        }
    }
    @media (min-width: 1366px) {
        .registration-container {
            flex-direction: column;
        }
    }
    @media (min-width: 1900px) {
        .registration-container {
            flex-direction: row;
        }
    }
</style>