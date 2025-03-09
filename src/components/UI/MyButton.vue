<template>
    <button @click="onClick" 
        :class="
            { 'with-text': localLabel }
            " 
        :disabled="localDisabled">
      <img v-if="localIconName" 
        :src="MyUiIcons.getIconPath(localIconName)"
        :class="{ 'with-text': localLabel }" />
      <span v-if="localLabel">{{ localLabel }}</span>
    </button>
  </template>
    
  <script setup>
  import { ref, watch } from "vue";
  import MyUiIcons, { IconNames, IconSizes } from "../UI/icons";
  
  const props = defineProps({
    label: String,
    iconName: IconNames,
    iconSize: IconSizes,
    disabled: Boolean,
    onClick: {
        type: Function,
        required: true,
    }
  });
  
  const emit = defineEmits(["remove"]);
  
  const localLabel = ref(props.label || "");
  const localIconName = ref(props.iconName || "");
  const localDisabled = ref(props.disabled || false);
  
  watch(
    () => props.label,
    (newValue) => {
      localLabel.value = newValue || "";
    }
  );
  
  watch(
    () => props.iconName,
    (newValue) => {
      localIconName.value = newValue || "";
    }
  );
  
  watch(
    () => props.disabled,
    (newValue) => {
      localDisabled.value = newValue || false;
    }
  );
  </script>
  
<style lang="scss">
button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: var(--green-light);
    color: var(--white);
    border: none;
    border-radius: 32px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    &:hover {
        outline: none;
        background-color: var(--green-middle);
    }
    &:active {
      border: none;
      outline: none;
      background-color: var(--green-dark);
    }
    &:disabled {
        border: none;
        background-color: var(--gray);
    }
    &.with-text{
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 12px;
        padding-bottom: 12px;
    }
    span {
        height: 32px;
        display: flex;
        align-items: center;
    }
    img {
      height: 16px;
      width: 16px;
      padding-right: 0px;
        &.with-text{
        padding-right: 12px;
        }
    }
}
</style>