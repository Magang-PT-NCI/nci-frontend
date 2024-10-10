import { Alert } from "react-native";

const customConfirmDialogue = (
  title: string,
  message: string,
  pressCancel: () => void,
  pressConfirm: () => void
) => {
  Alert.alert(title, message, [
    {
      text: "Batal",
      onPress: () => {
        pressCancel();
        console.log("Pengajuan dibatalkan");
      },
      style: "cancel",
    },
    {
      text: "Ya",
      onPress: () => {
        pressConfirm();
        console.log("Pengajuan dikirim:");
      },
    },
  ]);
};

export default customConfirmDialogue;
