import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { IconNames, IconSizes } from './components/UI/icons';
import {MyButton, MyInputBox} from "./components/UI/AllMyComponentsPack";

const app = createApp(App)

app.component("MyButton", MyButton)
app.component("MyInputBox", MyInputBox)

// Глобальная регистрация Icons
app.config.globalProperties.$IconNames = IconNames;
app.config.globalProperties.$IconSizes = IconSizes;

app.mount('#app')
