<template>
    <div class="note">
      <div class="note-header">
        <h4 placeholder="Заголовок" class="note-title">{{ localTitle }}</h4>
      </div>
      <div class="note-content">
        <p placeholder="Текст заметки" class="note-text">{{ localText }}</p>
      </div>
      <div class="note-bottom">
        <MyButton label="Удалить" :iconName="$IconNames.Close" :onClick="removeNote"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps({
    id: Number,
    title: String,
    text: String,
  });
  
  const emit = defineEmits(["remove"]);
  
  const localId = ref(props.id || 0);
  const localTitle = ref(props.title || "");
  const localText = ref(props.text || "");
    
  const removeNote = () => {
    console.log("Delete clicked at");
    console.log(localId.value);
    emit("remove", localId.value);
  };
  </script>
  
  <style lang="scss">
  .body {
    background-color: #0A1F38;
  }
  .note {
    overflow: hidden;
    display: block;
    width: 100%;
    padding: 0px;
    border-radius: 12px;
    background-color: var(--green-light);
    .note-header {
      border-bottom: 1px solid var(--green);
      display: flex;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-size: 24px;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 28px;
        margin-right: 28px;
      }
    }
    .note:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 24px 24px 0; /* Увеличен размер */
    border-style: solid;
    border-color: #fff #fff #333 #333; /* Изменен цвет */
    background: #333; /* Изменен цвет */
    display: block;
    width: 0;
  }
    .note-content {
      border-color: var(--green);
      border-width: 1px;
      padding: 28px;
      padding-top: 20px;
        p {
            font-size: 20px;
            margin: 0px;
            text-align: left;
        }
    }
    .note-bottom {
        padding: 8px;
        display: flex;
        flex-direction: row-reverse;
      }
    }
  </style>