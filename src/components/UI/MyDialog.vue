<template>
    <div class="dialog-overlay" v-if="localVisible">
      <div class="dialog-container">
        <div class="close-button-container">
          <MyButton :iconName="$IconNames.Close" :onClick="closeDialog" />
        </div>
        <div class="header-container">
            <slot name="header"></slot>
        </div>
        <div class="content-container">
            <slot name="content"></slot>            
        </div>
        <div class="bottom-container">
            <slot name="bottom"></slot>            
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import MyUiIcons, { IconNames, IconSizes } from "../UI/icons";
  
  const props = defineProps({
    visible: Boolean,
  });
  
  const localVisible = ref(props.visible || false);
  
  const closeDialog = () => {
    localVisible.value = false;
  };

  watch(() => props.visible, (newValue) => {
    localVisible.value = newValue || false;
  });
  </script>
  
  <style lang="scss">
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--dark-overlay);
    display: flex;
    justify-content: center;
    align-items: center;
  
    .dialog-container {
      background-color: var(--dark-middle);
      padding-top: 42px;
      padding-bottom: 42px;
      padding-left: 16px;
      padding-right: 16px;
      margin: 4px;
      border-radius: 40px;
      width: 100%;
      height: -webkit-fill-available;
      max-width: 780px;
      position: relative;
      align-content: center;
      .content-container {
        margin-top: 28px;
        margin-bottom: 28px;
      }
  
        @media (min-width: 768px) {
            .content-container {
            margin-top: 40px;
            margin-bottom: 40px;
            }
        }
    }
  
    .close-button-container {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 10;
    }
  
    @media (min-width: 768px) {
        .close-button-container {
            top: 20px;
            right: 20px;
        }
        .dialog-container {
            padding: 56px;
            width: 576px;
            margin-top: 4px;
            margin-bottom: 4px;
            margin: 4px;
            height: min-content;
        }
    }
  
    @media (min-width: 1366px) {
        .dialog-container {
            width: 482px;
        }
    }
    @media (min-width: 1900px) {
        .dialog-container {
            width: 620px;
            padding: 80px;
        }
    }
  }
  </style>