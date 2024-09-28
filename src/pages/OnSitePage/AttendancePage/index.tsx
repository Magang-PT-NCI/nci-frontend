import { useState } from 'react';
import { View, Text } from 'react-native';
import React from 'react';
import ButtonCustom from '../../../components/ButtonCustom';
import EmployeeInfo from '../../../components/EmployeeInfo';
import AttendanceHistory from '../../../components/AttendanceHistory';
import CameraComponent from '../../../components/CameraComponent/CameraComponent';
import ImageAttendance from '../../../components/ImageAttendance';

const AttendancePage = () => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const handlerAttendance = () => {
    if (isCheckedIn) {
      console.log("Check OUT");
      setIsCheckedIn(false);
    } else {
      setCameraVisible(true);
    }
  };

  const handlePhotoCapture = (photo: string) => {
    setCapturedPhoto(photo);
    setCameraVisible(false);
    setIsCheckedIn(true);
    console.log("Photo captured:", photo);
  };

  const handleCancelCamera = () => {
    setCameraVisible(false);
  };

  return (
    <View className="w-full h-full flex bg-background p-4 justify-center ">
      <Text className="font-bold text-xl text-accentYellow text-left my-4">
        Hai John Doe, Selamat Datang!
      </Text>
      <EmployeeInfo NIK="001230045600700" name="John Doe" area="Bandung" role="Programmer" />

      <ButtonCustom title={isCheckedIn ? 'Check Out' : 'Check In'} callbackEvt={handlerAttendance} mt={20} />

      <AttendanceHistory />

      {cameraVisible && (
        <CameraComponent onCapture={handlePhotoCapture} onCancel={handleCancelCamera} />
      )}

      <ImageAttendance checkInTime='07:00' checkOutTime='14:00'/>

    </View>
  );
};

export default AttendancePage;
