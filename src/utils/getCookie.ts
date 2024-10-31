import * as SecureStore from 'expo-secure-store';

export async function getCookie(key: string) {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    }
  } catch (error) {
    console.log('Error retrieving cookie:', error);
  }
  return null;
}
