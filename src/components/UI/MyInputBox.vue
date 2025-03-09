<template>
  <div class="inputbox-container">
    <div class="label-container">
      <span class="label">{{localLabel}}</span>
    </div>
    <div class="input-container">
      <input :placeholder=localPlaceholder :value="localValue" @input="updateValue" />
      <!-- <input class="passwordField" v-if="showPassword" placeholder="SampleText" :value="localValue" @input="updateValue" />
      <input class="passwordField" v-if="!showPassword" placeholder="SampleText" :value="hiddenPassword" @input="updateHiddenValue" />
      <MyButton id="togglePassword" 
        :iconName="showPassword? IconNames.OffPassword : IconNames.OnPassword" 
        :onClick="togglePassword"/> -->
    </div>
    <div class="subtext-container">
      <span class="error-message">{{ localErrorMessage }}</span>
    <span v-if="localMaxLenght != 0" class="lenght-message">{{ localValue.length }}/{{localMaxLenght}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import MyUiIcons, { IconNames, IconSizes } from "../UI/icons";
import MyButton from "./MyButton.vue";

const props = defineProps({
  label: String,
  value: String,
  placeholder: String,
  maxLenght: Number,
  disabled: Boolean,
});

const emit = defineEmits(["input"]);

const showPassword = ref(false);
const localLabel = ref(props.label || "Лейбл");
const localErrorMessage = ref("");
const localValue = ref(props.value || "");
const localPlaceholder = ref(props.placeholder || "Подсказка");
const localMaxLenght = ref(props.maxLenght || 10);
const localDisabled = ref(props.disabled || false);
const hiddenPassword = ref('*'.repeat(localValue.length) || "")
watch(
  () => props.value,
  (newValue) => {
    localValue.value = newValue || "";
  }
);

watch(
  () => props.label,
  (newValue) => {
    localLabel.value = newValue || "";
  }
);

watch(
  () => props.disabled,
  (newValue) => {
    localDisabled.value = newValue || false;
  }
);
const togglePassword = () => { showPassword.value = !showPassword.value; };
// const updateHiddenValue = (event) => {
//   if (localValue.value.length < event.target.value.length){
//     localValue.value = localValue.value + event.target.value[event.target.value.length - 1];
//   }
//   if (localValue.value.length > event.target.value.length){
//     localValue.value = localValue.value.slice(0, event.target.value.length);
//   }
//   if (event.target.value.length == 1 && event.target.value[0] != localValue.value[0]){
//     localValue.value = event.target.value[0];
//   }
//   hiddenPassword.value = '*'.repeat(event.target.value.length);
//   emit("input", localValue.value);
// };
const updateValue = (event) => {
  localValue.value = event.target.value;
  hiddenPassword.value = '*'.repeat(event.target.value.length);
  emit("input", event.target.value);
};
</script>

<style lang="scss">
.input-container {
  position: relative;
    display: flex;
    flex-direction: column;
}
#togglePassword {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}
input {
  box-sizing: border-box;
  font-family: "Montserrat";
  border-radius: 36px;
  border: none;
  height: 72px;
  font-size: 18px;
  padding-left: 28px;
  padding-right: 28px;
  &:hover {
    outline: none;
    border: 2px;
    border: solid;
    border-color: var(--green-light);
  }
  &:focus {
    outline: none;
    border: 2px;
    border: solid;
    border-color: var(--green-light);
  }
  .passwordField {
    padding-right: 42px;
  }
}
.label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  padding-right: 24px;
  padding-left: 24px;
  margin-bottom: 8px;
  .label {
    color: var(--gray);
  }
}
.subtext-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  margin-top: 8px;
  padding-right: 24px;
  padding-left: 24px;
  .error-message {
    color: var(--error-text);
  }
  .lenght-message {
    color: var(--gray);
  }
}
</style>