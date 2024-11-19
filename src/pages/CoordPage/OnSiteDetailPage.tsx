import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmployeeInfo from '../../components/EmployeeInfo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../utils/StackParamList';
import { getCookie } from '../../utils/getCookie';
import ApiRequest from '../../utils/ApiRequest';
import { HeadersReq, ParamsReq } from '../../interfaces/api-request';
import { EmployeeResData } from '../../interfaces/employee.dto';
import { Endpoint } from '../../enums/endpoint-class';
import { StackActions, useNavigation } from '@react-navigation/native';
import { AttendanceResData } from '../../interfaces/attendance.dto';
import AttendanceMap from '../../components/AttendanceMap';
import ImageAttendance from '../../components/ImageAttendance';
import { Ionicons } from '@expo/vector-icons';
import LogbookPage from '../OnSitePage/LogbookPage';

type OnsiteMainProps = NativeStackScreenProps<
  StackParamList,
  'OnsiteDetailPage'
>;

const OnSiteDetailPage: React.FC<OnsiteMainProps> = ({ route }) => {
  const { dataRow } = route.params;
  const [onsiteData, setOnsiteData] = useState({} as EmployeeResData);
  const [attendanceData, setAttendanceData] = useState({} as AttendanceResData);
  const navigation = useNavigation();

  const getOnsiteData = async () => {
    const token = await getCookie('token');
    if (token) {
      const res = await new ApiRequest<HeadersReq, EmployeeResData>(
        Endpoint.GetEmployee,
      )
        .setToken(token)
        .setPathParam(dataRow.nik)
        .get();

      const data = res.getData();

      if (data) {
        setOnsiteData(data);
      }
    } else {
      navigation.dispatch(StackActions.replace('LoginPage'));
    }
  };

  const getAttendanceData = async () => {
    const token = await getCookie('token');
    if (token) {
      const res = await new ApiRequest<ParamsReq, AttendanceResData>(
        Endpoint.Attendance,
      )
        .setToken(token)
        .setPathParam(dataRow.nik)
        .setParams({ filter: 'all' })
        .get();

      const data = res.getData();

      console.log(data);

      if (data) {
        setAttendanceData(data);
      }
    } else {
      navigation.dispatch(StackActions.replace('LoginPage'));
    }
  };

  useEffect(() => {
    getOnsiteData();
    getAttendanceData();
  }, []);

  return (
    // @ts-ignore
    <ScrollView style={{ showsVerticalScrollIndicator: false }}>
      <SafeAreaView>
        <View className="w-full h-full flex bg-background p-4">
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name={'arrow-back-outline'} size={28} color="gray" />
            </TouchableOpacity>
            <Text className="font-bold text-xl text-accentYellow text-left my-4 ml-3">
              Detail Info OnSite
            </Text>
          </View>
          <EmployeeInfo
            NIK={onsiteData.nik}
            name={onsiteData.name}
            area={onsiteData.area}
            role={onsiteData.role}
            date={attendanceData.date}
            status={dataRow.status}
          />

          {/* attendance-photos */}
          <ImageAttendance
            checkInImage={attendanceData.checkIn?.photo}
            checkOutImage={attendanceData.checkOut?.photo}
            checkInTime={attendanceData.checkIn?.time}
            checkOutTime={attendanceData.checkOut?.time}
          />

          {/*check in location*/}
          <AttendanceMap
            status={'Check In'}
            latitude={attendanceData.checkIn?.location?.latitude}
            longitude={attendanceData.checkIn?.location?.longitude}
          />

          {/*/!*check out location*!/*/}
          <AttendanceMap
            status={'Check Out'}
            latitude={attendanceData.checkOut?.location?.latitude}
            longitude={attendanceData.checkOut?.location?.longitude}
          />

          {/*logbook*/}
          <LogbookPage
            role="coord"
            logbookData={attendanceData.activities}
            attendanceID={attendanceData.id}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default OnSiteDetailPage;
