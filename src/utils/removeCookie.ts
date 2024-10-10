import * as SecureStore from "expo-secure-store";

export async function removeCookie(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("Cookie deleted successfully");
  } catch (error) {
    console.log("Error deleting cookie:", error);
  }
}
