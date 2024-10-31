import * as SecureStore from 'expo-secure-store';

export async function setCookie(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log('Error saving cookie:', error);
  }
}
