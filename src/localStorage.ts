export function saveTokenToLocalStorage(token: string): void {
    try {
      localStorage.setItem('authToken', token);
      console.log('Токен успешно сохранен в localStorage');
    } catch (error) {
      console.error('Ошибка при сохранении токена в localStorage:', error);
    }
  }
  
  export function getTokenFromLocalStorage(): string | null {
    try {
      return localStorage.getItem('authToken');
    } catch (error) {
      console.error('Ошибка при получении токена из localStorage:', error);
      return null;
    }
  }
  
  export function removeTokenFromLocalStorage(): void {
    try {
      localStorage.removeItem('authToken');
      console.log('Токен успешно удален из localStorage');
    } catch (error) {
      console.error('Ошибка при удалении токена из localStorage:', error);
    }
  }

  export function saveUserInfoToLocalStorage(userLogin: string): void {
    try {
      localStorage.setItem('userLogin', userLogin);
      console.log('User login успешно сохранен в localStorage');
    } catch (error) {
      console.error('Ошибка при сохранении user login в localStorage:', error);
    }
  }
  
  export function getUserInfoFromLocalStorage(): string | null {
    try {
      return localStorage.getItem('userLogin');
    } catch (error) {
      console.error('Ошибка при получении user login из localStorage:', error);
      return null;
    }
  }
  
  export function removeUserInfoFromLocalStorage(): void {
    try {
      localStorage.removeItem('userLogin');
      console.log('User login успешно удален из localStorage');
    } catch (error) {
      console.error('Ошибка при удалении user login из localStorage:', error);
    }
  }