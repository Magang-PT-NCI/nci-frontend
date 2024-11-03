import { Dayjs } from 'dayjs';
import { Camera } from 'expo-camera';
import { Alert, Linking } from 'react-native';
import * as Location from 'expo-location';

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

  if (cameraPermission !== 'granted') {
    Alert.alert(
      'Peringatan',
      'Tidak dapat melanjutkan tanpa akses kamera. Pastikan untuk mengubah perizinan pada pengaturan perangkat.',
      [
        {
          text: 'Mengerti',
          onPress: () => {
            Linking.openSettings(); // Membuka pengaturan aplikasi untuk mengubah izin
          },
        },
      ],
    );
    return false;
  } else {
    return true;
  }
};

export const getLocation = async () => {
  const { status: gpsPermission } =
    await Location.requestForegroundPermissionsAsync();
  if (gpsPermission !== 'granted') {
    Alert.alert(
      'Peringatan',
      'Tidak dapat melanjutkan tanpa akses lokasi. Pastikan untuk mengubah perizinan pada pengaturan perangkat.',
      [
        {
          text: 'Mengerti',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
    );
    return;
  } else {
    const location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    return { latitude, longitude };
  }
};

export const getStatus = (status: string) => {
  switch (status) {
    case 'presence':
      return 'Hadir';
    case 'permit':
      return 'Izin';
    case 'absent':
      return 'Absen';
    default:
      return status;
  }
};
