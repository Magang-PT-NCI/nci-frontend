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
  EmployeeResData,
} from "../../interfaces/employee.dto";
import { Endpoint } from "../../enums/api-enum";
import {
  getLocation,
  isEmpty,
  requestCameraPermission,
  workingHours,
} from "../../utils/commonUtils";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import {AttendanceCheckRes, AttendancePostRes, AttendanceResData} from "../../interfaces/attendance.dto";
import AttendanceMap from "../../components/AttendanceMap";

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
  const [checkResData, setCheckResData] = useState<{
    checkIn: AttendanceCheckRes | null, checkOut: AttendanceCheckRes | null}>({checkIn: null, checkOut: null});

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
    } else {
      setCameraVisible(true);
    }

  };

  const navigation = useNavigation();
  const handlePhotoCapture = async (photo: string) => {

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
    formData.append("location", JSON.stringify(location));
    formData.append("photo", {
      uri: photo,
      name: "photo.jpg",
      type: "image/jpeg",
    });

      const response = await new ApiRequest<FormData, AttendancePostRes>(Endpoint.Attendance)
        .setToken(token)
        .setContentType("multipart/form-data")
        .setReqBody(formData)
        .post(
          (data) => console.log(data),
          (error) => {
            console.log(JSON.stringify(error, null, 2))

            Alert.alert(
                "Peringatan",
                error.message,
                [
                  {
                    text: "Mengerti",
                    onPress: () => {

                    },
                  },
                ]
            );
          }
        );

      const postResData = response.getData();


        setCheckResData((prevData)=> {
          if(postResData.type === "check_in") {
            return {
              checkOut: prevData.checkOut,
              checkIn: {
                time: postResData.time,
                photo: postResData.photo,
                location: postResData.location,
              }
            }
          }
          else {
            return {
              checkIn:prevData.checkIn,
              checkOut: {
                time: postResData.time,
                photo: postResData.photo,
                location: postResData.location,
              }
            }
          }
        })

    } else {
      navigation.replace("LoginPage");
    }
  };

  const handleCancelCamera = () => {
    setCameraVisible(false);
  };



  useEffect(() => {
    getLocation();
    requestCameraPermission();
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

    setCheckResData({checkIn:attendanceData.checkIn, checkOut: attendanceData.checkOut});

    setIsCheckedIn(!(isEmpty(attendanceData) || !(attendanceData?.checkIn)));

  }, [attendanceData]);

  if (isEmpty(attendanceData) && status !== 204) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Loading attendance data...</Text>
      </View>
    );
  }

  console.log(JSON.stringify(attendanceData,null, 2));
  console.log()

  return (
    <ScrollView style={{ showsVerticalScrollIndicator: false }}>
      <View className="w-full h-full flex bg-background px-4">
        <Text className="font-bold text-xl text-accentYellow text-left my-4">
          Hai {employee.name}, Selamat Datang!
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

        />

        <AttendanceHistory
          checkInTime={checkResData.checkIn?.time}
          checkOutTime={checkResData.checkOut?.time}
        />

        {cameraVisible && (
          <CameraComponent
            onCapture={handlePhotoCapture}
            onCancel={handleCancelCamera}
          />
        )}

        <ImageAttendance
          checkInImage={checkResData.checkIn?.photo}
          checkOutImage={checkResData.checkOut?.photo}
        />

        {/*check in location*/}
        {/*<AttendanceMap*/}
        {/*    status={"Check In"}*/}
        {/*    latitude={checkResData.checkIn?.location?.latitude}*/}
        {/*    longitude={checkResData.checkIn?.location?.longitude}/>*/}

        {/*/!*check out location*!/*/}
        {/*<AttendanceMap*/}
        {/*    status={"Check Out"}*/}
        {/*    latitude={checkResData.checkOut?.location?.latitude}*/}
        {/*    longitude={checkResData.checkOut?.location?.longitude}/>*/}
      </View>



    </ScrollView>
  );
};

export default AttendancePage;
