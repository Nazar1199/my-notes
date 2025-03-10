<template>
    <MyButton :onClick="openLoginDialog" label="Открыть диалог"/>
    <MyDialog :visible="showDialog">
      <template #header>
        <div class="header">
            <h2>Добавление заметки</h2>
        </div>
      </template>
      <template #content>
        <div class="content">
            <MyInputBox 
                id="note-name" 
                :value="noteNameValue" 
                @input="noteNameValue = $event"
                :maxLenght="100"
                label="Название заметки" 
                placeholder="Введите название"/>
            <MyTextArea 
                id="note-text" 
                :value="noteTextValue" 
                @textarea="noteTextValue = $event"
                :maxLenght="500"
                label="Текст заметки" 
                placeholder="Введите текст"/>
        </div>
      </template>
      <template #bottom>
        <div >
            <div class="bottom">
                <MyButton :onclick="login" label="Добавить"/>
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
  const noteNameValue = ref("");
  const noteTextValue = ref("");
  
  const openLoginDialog = () => {
    console.log("Open login");
    showDialog.value = true;
    console.log(showDialog.value);
  };
  
  const login = async () => {
  try {
    await loginUser(noteNameValue.value, noteTextValue.value);
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
    #note-name {
        margin-bottom: 16px;
    }
    @media (min-width: 768px) {
        .bottom {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: center;
        }
        #note-name {
            margin-bottom: 24px;
        }
    }
</style>