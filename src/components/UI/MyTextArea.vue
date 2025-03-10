<template>
  <div class="textareabox-container">
    <div class="label-container">
      <span class="label">{{localLabel}}</span>
    </div>
    <div class="textarea-container">
      <textarea :placeholder=localPlaceholder :value="localValue" @textarea="updateValue"></textarea>
    </div>
    <div v-if="localShowErrors == true || localMaxLenght != 0" class="subtext-container">
      <span class="error-message">{{ localErrorMessage }}</span>
      <span v-if="localMaxLenght != 0" class="lenght-message">{{ localValue.length }}/{{localMaxLenght}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: String,
  value: String,
  placeholder: String,
  maxLenght: Number,
  disabled: Boolean,
  showErrors: Boolean,
});

const emit = defineEmits(["textarea"]);

const localLabel = ref(props.label || "Поле ввода");
const localErrorMessage = ref("");
const localValue = ref(props.value || "");
const localPlaceholder = ref(props.placeholder || "");
const localMaxLenght = ref(props.maxLenght || 0);
const localShowErrors = ref(props.showErrors || false);
const localDisabled = ref(props.disabled || false);
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
const updateValue = (event) => {
  localValue.value = event.target.value;
  emit("textarea", event.target.value);
};
</script>

<style lang="scss">
.textarea-container {
  position: relative;
    display: flex;
    flex-direction: column;
}
textarea {
  box-sizing: border-box;
  font-family: "Montserrat";
  border-radius: 36px;
  border: none;
  height: 168px;
  font-size: 18px;
  padding-left: 28px;
  padding-right: 28px;
  padding-top: 16px;
  padding-bottom: 16px;
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
@media (min-width: 1900px) {
  textarea {
    height: 244px;
  }
}
</style>