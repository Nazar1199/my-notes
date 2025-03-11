// stores/userGlobalInfo.js
import { defineStore } from 'pinia';
import type { User } from './models/User';

export const useUserGlobalInfoStore = defineStore('userGlobalInfo', {
  state: () => ({
    id: 0,
    email: '',
    isAuthenticated: false,
  }),
  actions: {
    setUser(user: User) {
        console.log("User setted");
      if (user) {
        this.id = user.id;
        this.email = user.email;
        this.isAuthenticated = true;
      } else {
        this.clearUser();
      }
    },
    clearUser() {
      this.id = 0;
      this.email = '';
      this.isAuthenticated = false;
    },
    syncUserWithLocalStorage() {
      console.log("syncUserWithLocalStorage started");
      try {
          const userString = localStorage.getItem('userLogin');
          console.log(userString?.toString);
          if (!userString) {
              console.log("No userLogin in localStorage");
              return;
          }
          const localStorageUser = JSON.parse(userString);
          if (localStorageUser && typeof localStorageUser.email === 'string') {
              this.id = localStorageUser.id;
              this.email = localStorageUser.email;
              this.isAuthenticated = true;
              console.log("User successfully synced from localStorage");
          } else {
              console.error("Invalid user data structure");
          }
      } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
      }
  }
  },
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    email: (state) => state.email,
  },
});