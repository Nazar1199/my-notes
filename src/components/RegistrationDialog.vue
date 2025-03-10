<template>
    <MyButton :onClick="openLoginDialog" label="Открыть диалог"/>
    <MyDialog :visible="showDialog">
      <template #header>
        <div class="header">
            <h2>Регистрация</h2>
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
            <MyInputBox 
                id="passwordRepeat" 
                :value="passwordRepeatValue" 
                @input="passwordRepeatValue = $event"
                label="Пароль ещё раз" 
                placeholder="Введите пароль"/>
        </div>
      </template>
      <template #bottom>
        <div >
            <div class="bottom">
                <div class="registration-container">
                    <p class="text-small">У вас есть аккаунт?</p>
                    <a class="text-small-bold">Войдите</a>
                </div>
                <MyButton :onclick="login" label="Зарегистрироваться"/>
            </div>
            <div v-if="errorMessage" id="errors-block">
                <p id="errors-text" class="text-small">{{ errorMessage }}</p>
            </div>
        </div>                
      </template>
    </MyDialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { loginUser } from "../api/auth";
  
  const showDialog = ref(false);
  const errorMessage = ref("");
  const loginValue = ref("");
  const passwordValue = ref("");
  const passwordRepeatValue = ref("");
  
  const openLoginDialog = () => {
    console.log("Open login");
    showDialog.value = true;
    console.log(showDialog.value);
  };
  
  const login = async () => {
  try {
    await loginUser(loginValue.value, passwordValue.value);
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = String(error.message);
  }
};

  const closeLoginDialog = () => {
    showDialog.value = false;
  };
  </script>

<style lang="scss">
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
    #email, #password {
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
        #email, #password {
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
            align-items: start;
        }
        p {
            margin-right: 8px;
        }
    }
    @media (min-width: 1900px) {
        .registration-container {
            flex-direction: row;
        }
    }
</style>