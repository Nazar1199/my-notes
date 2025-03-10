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