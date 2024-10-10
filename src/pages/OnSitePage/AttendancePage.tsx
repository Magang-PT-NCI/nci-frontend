import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import React from "react";
import ButtonCustom from "../../components/ButtonCustom";
import EmployeeInfo from "../../components/EmployeeInfo";
import AttendanceHistory from "../../components/AttendanceHistory";
import CameraComponent from "../../components/CameraComponent/CameraComponent";
import ImageAttendance from "../../components/ImageAttendance";
import ApiRequest from "../../utils/ApiRequest";
import { getCookie } from "../../utils/getCookie";
import { HeadersReq } from "../../interfaces/api-request";
import {
  AttendanceCheckRes,
  AttendanceResData,
  EmployeeResData,
} from "../../interfaces/api-response";
import { Endpoint } from "../../enums/api-enum";
import * as Location from "expo-location";
import {
  isEmpty,
  requestCameraPermission,
  workingHours,
} from "../../utils/commonUtils";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

type AttendancePageProps = {
  NIK: string;
  status: number;
  attendanceData: AttendanceResData;
};

const AttendancePage: React.FC<AttendancePageProps> = ({
  NIK,
  status,
  attendanceData,
}) => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [employee, setEmployee] = useState({} as EmployeeResData);
  const [isButtonCheckDisable, setIsButtonCheckDisable] = useState(true);

  const currentTime = dayjs();
  const startWorkTime = dayjs().hour(6).minute(0).second(0).millisecond(0);

  const getEmployeeData = async () => {
    const token = await getCookie("token");
    if (token) {
      const res = await new ApiRequest<HeadersReq, EmployeeResData>(
        Endpoint.GetEmployee
      )
        .setToken(token)
        .setPathParam(NIK)
        .get();

      const data = res.getData();
      if (data) {
        setEmployee(data);
      }
    }
  };

  const handlerAttendance = async () => {
    const hasPermission = await requestCameraPermission();

    // Hanya melanjutkan jika izin kamera diberikan
    if (!hasPermission) {
      return;
    }

    setCameraVisible(true);
  };

  const handlePhotoCapture = async (photo: string) => {
    const navigation = useNavigation();
    setCapturedPhoto(photo);
    setCameraVisible(false);
    setIsCheckedIn(true);

    const token = await getCookie("token");
    const location = await getLocation();
    const formData = new FormData();

    if (token && location) {
      formData.append("nik", NIK);
      formData.append(
        "type",
        isEmpty(attendanceData) ? "check_in" : "check_out"
      );
      formData.append("location", location[0] + "," + location[1]);
      formData.append("photo", {
        uri: photo,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      await new ApiRequest<FormData, AttendanceCheckRes>(Endpoint.Attendance)
        .setToken(token)
        .setContentType("multipart/form-data")
        .setReqBody(formData)
        .post(
          (data) => console.log(data),
          (error) => console.log(JSON.stringify(error, null, 2))
        );
    } else {
      navigation.replace("LoginPage");
    }
  };

  const handleCancelCamera = () => {
    setCameraVisible(false);
  };

  const getLocation = async () => {
    const { status: gpsPermission } =
      await Location.requestForegroundPermissionsAsync();
    if (gpsPermission !== "granted") {
      Alert.alert(
        "Peringatan",
        "Tidak dapat melanjutkan tanpa akses lokasi. Pastikan untuk mengubah perizinan pada pengaturan perangkat.",
        [
          {
            text: "Mengerti",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude.toString();
    const long = location.coords.longitude.toString();
    return [lat, long];
  };

  useEffect(() => {
    if (NIK) {
      getEmployeeData();
    }

    if (workingHours(currentTime, startWorkTime)) {
      setIsButtonCheckDisable(false);
    }
  }, [NIK]);

  useEffect(() => {
    if (!isEmpty(attendanceData)) {
      setIsCheckedIn(!attendanceData.checkIn);
      setIsButtonCheckDisable(!!attendanceData.checkOut);
    }
  }, [attendanceData]);

  if (isEmpty(attendanceData) && status !== 204) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Loading attendance data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ showsVerticalScrollIndicator: false }}>
      <View className="w-full h-full flex bg-background px-4">
        <Text className="font-bold text-xl text-accentYellow text-left my-4">
          Hai {employee.name}, Selamat Datang234!
        </Text>
        <EmployeeInfo
          NIK={employee.nik}
          name={employee.name}
          area={employee.area}
          role={employee.role}
        />

        <ButtonCustom
          title={isCheckedIn ? "Check Out" : "Check In"}
          callbackEvt={handlerAttendance}
          mt={20}
          disabled={isButtonCheckDisable}
        />

        <AttendanceHistory
          checkInTime={attendanceData.checkIn?.time}
          checkOutTime={attendanceData.checkOut?.time}
        />

        {cameraVisible && (
          <CameraComponent
            onCapture={handlePhotoCapture}
            onCancel={handleCancelCamera}
          />
        )}

        <ImageAttendance
          checkInImage={attendanceData.checkIn?.photo}
          checkOutImage={attendanceData.checkOut?.photo}
        />
      </View>
    </ScrollView>
  );
};

export default AttendancePage;
