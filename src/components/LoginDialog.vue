<template>
    <MyButton :onClick="openLoginDialog" label="Открыть диалог"/>
    <MyDialog :visible="showDialog">
      <template #header>
        <div class="header">
            <h2>Вход в ваш аккаунт</h2>
        </div>
      </template>
      <template #content>
        <div class="content">
            <MyInputBox id="email" label="Email" placeholder="Введите Email"/>
            <MyInputBox id="password" label="Пароль" placeholder="Введите пароль"/>
        </div>
      </template>
      <template #bottom>
        <div >
            <div class="bottom">
                <div class="registration-container">
                    <p class="text-small">У вас нет аккаунта?</p>
                    <a class="text-small-bold">Зарегистрируйтесь</a>
                </div>
                <MyButton :click="closeLoginDialog" label="Войти"/>
            </div>
            <div id="errors-block">
                <p id="errors-text" class="text-small">{{ errorMessage }}</p>
            </div>
        </div>                
      </template>
    </MyDialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const showDialog = ref(false);
  const errorMessage = ref("Пользователь с таким логином не найден");
//   const errorMessage = ref("");
  
  const openLoginDialog = () => {
    console.log("Open login");
    showDialog.value = true;
    console.log(showDialog.value);
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