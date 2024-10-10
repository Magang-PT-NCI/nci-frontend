import { Dayjs } from "dayjs";
import { Camera } from "expo-camera";
import { Alert, Linking } from "react-native";

export const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const workingHours = (currentTime: Dayjs, workStartTime: Dayjs) => {
  if (
    currentTime.hour() >= workStartTime.hour() &&
    currentTime.hour() <= workStartTime.hour() + 3
  ) {
    return true;
  } else {
    return false;
  }
};

export const requestCameraPermission = async () => {
  const { status: cameraPermission } =
    await Camera.requestCameraPermissionsAsync();

  if (cameraPermission !== "granted") {
    Alert.alert(
      "Peringatan",
      "Tidak dapat melanjutkan tanpa akses kamera. Pastikan untuk mengubah perizinan pada pengaturan perangkat.",
      [
        {
          text: "Mengerti",
          onPress: () => {
            Linking.openSettings(); // Membuka pengaturan aplikasi untuk mengubah izin
          },
        },
      ]
    );
    return false;
  }
  return true;
};
