import { Alert } from 'react-native';

const customConfirmDialogue = (
  title: string,
  message: string,
  pressCancel: () => void,
  pressConfirm: () => void,
) => {
  Alert.alert(title, message, [
    {
      text: 'Batal',
      onPress: () => {
        pressCancel();
      },
      style: 'cancel',
    },
    {
      text: 'Ya',
      onPress: () => {
        pressConfirm();
      },
    },
  ]);
};

export default customConfirmDialogue;
