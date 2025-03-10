import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { IconNames, IconSizes } from './components/UI/icons';
import {MyButton, MyInputBox, MyDialog, MyTextArea} from "./components/UI/AllMyComponentsPack";
import MainPage from './pages/MainPage.vue';
import MyNotesPage from './pages/MyNotesPage.vue';
import { createPinia } from 'pinia';

const pinia = createPinia();


const routes = [
  { path: '/', component: MainPage },
  { path: '/notes', component: MyNotesPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });


const app = createApp(App)
app.use(router);
app.use(pinia)

app.component("MyButton", MyButton)
app.component("MyInputBox", MyInputBox)
app.component("MyDialog", MyDialog)
app.component("MyTextArea", MyTextArea)

// Глобальная регистрация Icons
app.config.globalProperties.$IconNames = IconNames;
app.config.globalProperties.$IconSizes = IconSizes;

app.mount('#app')
