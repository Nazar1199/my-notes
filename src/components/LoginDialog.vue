<template>
    <MyButton :onClick="openLoginDialog" label="Открыть диалог"/>
    <MyDialog :visible="showDialog">
      <template #header>
        <h2>Вход в ваш аккаунт</h2>
      </template>
      <template #content>
        <MyInputBox/>
        <MyInputBox/>
      </template>
      <template #bottom>
        <MyButton :click="closeLoginDialog" :iconName="$IconNames.Close" label="Войти"/>
      </template>
    </MyDialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const showDialog = ref(false);
  
  const openLoginDialog = () => {
    console.log("Open login");
    showDialog.value = true;
    console.log(showDialog.value);
  };
  
  const closeLoginDialog = () => {
    showDialog.value = false;
  };
  </script>