import { Alert } from "react-native";

const customConfirmDialogue = (title: string, message: string) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Batal",
        onPress: () => console.log("Pengajuan dibatalkan"),
        style: "cancel"
      },
      { 
        text: "Ya", 
        onPress: () => {
          console.log('Pengajuan dikirim:');
        } 
      }
    ]
  );
}

export default customConfirmDialogue