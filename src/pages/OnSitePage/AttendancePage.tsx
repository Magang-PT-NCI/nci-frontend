import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import EmployeeInfo from '../../components/EmployeeInfo';
import AttendanceHistory from '../../components/AttendanceHistory';
import CameraComponent from '../../components/CameraComponent/CameraComponent';
import ImageAttendance from '../../components/ImageAttendance';
import ApiRequest from '../../utils/ApiRequest';
import { getCookie } from '../../utils/getCookie';
import { HeadersReq } from '../../interfaces/api-request';
import { EmployeeResData } from '../../interfaces/employee.dto';
import { Endpoint } from '../../enums/endpoint-class';
import {
  getLocation,
  isEmpty,
  requestCameraPermission,
} from '../../utils/commonUtils';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  AttendanceCheckRes,
  AttendancePostRes,
  AttendanceResData,
} from '../../interfaces/attendance.dto';
import AttendanceMap from '../../components/AttendanceMap';
import { Ionicons } from '@expo/vector-icons';
import { OvertimeReq, OvertimeResData } from '../../interfaces/overtime.dto';
import ConfirmationForm from '../../components/ConfirmationForm';

type AttendancePageProps = {
  NIK: string;
  status: number;
  attendanceData: AttendanceResData;
  isCheckedIn: boolean;
  setIsCheckedIn: (isCheckedIn: boolean) => void;
  setAttendanceID: (id: number) => void;
  getAttendance: () => void;
};

const AttendancePage: React.FC<AttendancePageProps> = ({
  NIK,
  status,
  attendanceData,
  isCheckedIn,
  setIsCheckedIn,
  setAttendanceID,
  getAttendance,
}) => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [employee, setEmployee] = useState({} as EmployeeResData);
  const [checkResData, setCheckResData] = useState<{
    checkIn: AttendanceCheckRes | null;
    checkOut: AttendanceCheckRes | null;
  }>({ checkIn: null, checkOut: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEmployeeData = async () => {
    const token = await getCookie('token');
    if (token) {
      const res = await new ApiRequest<HeadersReq, EmployeeResData>(
        Endpoint.GetEmployee,
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
    setCameraVisible(false);

    const token = await getCookie('token');
    const location = await getLocation();
    const formData = new FormData();
    const type = checkResData.checkIn ? 'check_out' : 'check_in';

    if (token && location) {
      formData.append('nik', NIK);
      formData.append('type', type);
      formData.append('location', JSON.stringify(location));
      formData.append('photo', {
        uri: photo,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as unknown as Blob);

      const response = await new ApiRequest<FormData, AttendancePostRes>(
        Endpoint.Attendance,
      )
        .setToken(token)
        .setContentType('multipart/form-data')
        .setReqBody(formData)
        .post(
          () => {
            setIsCheckedIn(type === 'check_in');
            getAttendance();
          },
          (error) => {
            console.log(JSON.stringify(error, null, 2));

            Alert.alert('Peringatan', error.message, [
              {
                text: 'Mengerti',
                onPress: () => {},
              },
            ]);
          },
        );

      const postResData = response.getData();
      setAttendanceID(postResData.attendance_id);

      setCheckResData((prevData) => {
        if (postResData.type === 'check_in') {
          return {
            checkOut: prevData.checkOut,
            checkIn: {
              time: postResData.time,
              photo: postResData.photo,
              location: postResData.location,
            },
          };
        } else {
          return {
            checkIn: prevData.checkIn,
            checkOut: {
              time: postResData.time,
              photo: postResData.photo,
              location: postResData.location,
            },
          };
        }
      });
    } else {
      navigation.dispatch(StackActions.replace('LoginPage'));
    }
  };

  const handleCancelCamera = () => {
    setCameraVisible(false);
  };

  const handleOvertime = async () => {
    const token = await getCookie('token');

    if (token) {
      await new ApiRequest<OvertimeReq, OvertimeResData>(Endpoint.Overtime)
        .setToken(token)
        .setReqBody({ nik: NIK })
        .post(
          () => {
            Alert.alert('Pemberitahuan', 'Pengajuan LEMBUR berhasil dikirim', [
              {
                text: 'Mengerti',
                onPress: () => {},
              },
            ]);
          },
          (error) => {
            Alert.alert('Pemberitahuan', error.message, [
              {
                text: 'Mengerti',
                onPress: () => {},
              },
            ]);
          },
        );
    } else {
      navigation.dispatch(StackActions.replace('LoginPage'));
    }
  };

  const handlePresenceConfirmation = async () => {
    setIsModalOpen(true);
    console.log('[AttendancePage] TEST - Open modal confirm presence');
  };

  useEffect(() => {
    getLocation();
    requestCameraPermission();
    if (NIK) {
      getEmployeeData();
    }
  }, [NIK]);

  useEffect(() => {
    if (!isEmpty(attendanceData)) {
      setIsCheckedIn(!attendanceData.checkIn);
    }

    setCheckResData({
      checkIn: attendanceData.checkIn,
      checkOut: attendanceData.checkOut,
    });

    setIsCheckedIn(!(isEmpty(attendanceData) || !attendanceData?.checkIn));
  }, [attendanceData]);

  if (isEmpty(attendanceData) && status !== 204) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Loading attendance data...</Text>
      </View>
    );
  }

  return (
    // @ts-ignore
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
          status={attendanceData?.late ? 'Terlambat' : attendanceData?.status}
        />

        <ButtonCustom
          icon={'hand-left-outline'}
          title={isCheckedIn ? 'Check Out' : 'Check In'}
          disabled={!!attendanceData.checkOut}
          callbackEvt={handlerAttendance}
          mt={20}
        />

        <View className="px-2 flex flex-row mt-4 justify-center">
          <TouchableOpacity
            onPress={handleOvertime}
            className="w-1/2 bg-accentGreen rounded-lg p-2 items-center mr-3"
          >
            <Ionicons name="newspaper-outline" size={24} color="black" />
            <Text className="text-background text-xs text-center">
              Pengajuan Lembur
            </Text>
          </TouchableOpacity>

          {/*confirm-absent-button*/}
          <TouchableOpacity
            onPress={handlePresenceConfirmation}
            className={`w-1/2 bg-accentGreen rounded-lg p-2 items-center`}
          >
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
            <Text className="text-background text-xs text-center">
              Konfirmasi Kehadiran
            </Text>
          </TouchableOpacity>
        </View>

        <ConfirmationForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          attendanceData={attendanceData}
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
        <AttendanceMap
          status={'Check In'}
          latitude={checkResData.checkIn?.location?.latitude}
          longitude={checkResData.checkIn?.location?.longitude}
        />

        {/*/!*check out location*!/*/}
        <AttendanceMap
          status={'Check Out'}
          latitude={checkResData.checkOut?.location?.latitude}
          longitude={checkResData.checkOut?.location?.longitude}
        />
      </View>
    </ScrollView>
  );
};

export default AttendancePage;
