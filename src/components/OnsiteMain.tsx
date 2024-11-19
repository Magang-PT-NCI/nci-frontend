import { View, Alert, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AttendancePage from '../pages/OnSitePage/AttendancePage';
import LogbookPage from '../pages/OnSitePage/LogbookPage';
import PermitPage from '../pages/OnSitePage/PermitPage';
import HeaderBar from './HeaderBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../utils/StackParamList';
import ApiRequest from '../utils/ApiRequest';
import { Endpoint } from '../enums/endpoint-class';
import { getCookie } from '../utils/getCookie';
import { ParamsReq } from '../interfaces/api-request';
import { isEmpty } from '../utils/commonUtils';
import { AttendanceResData } from '../interfaces/attendance.dto';

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#ffcc00' }}
    style={{ backgroundColor: '#0f172a' }}
    labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
    activeColor="#ffcc00"
  />
);

type OnsiteMainProps = NativeStackScreenProps<StackParamList, 'OnsiteMain'>;

const OnsiteMain: React.FC<OnsiteMainProps> = ({ route }) => {
  const { profile_photo } = route.params;
  const { NIK } = route.params;

  const [attendanceData, setAttendanceData] = useState({} as AttendanceResData);
  const [attendanceStatus, setAttendanceStatus] = useState(0);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceID, setAttendanceID] = useState<number | null>(null);

  interface renderSceneProps {
    route: { key: string; title: string };
  }

  const renderScene = ({ route }: renderSceneProps) => {
    switch (route.key) {
      case 'attendance':
        return (
          <AttendancePage
            getAttendance={getAttendance}
            NIK={NIK}
            attendanceData={attendanceData}
            status={attendanceStatus}
            isCheckedIn={isCheckedIn}
            setIsCheckedIn={setIsCheckedIn}
            setAttendanceID={setAttendanceID}
          />
        );
      case 'logbook':
        return (
          <LogbookPage
            role="onsite"
            getAttendance={getAttendance}
            logbookData={attendanceData.activities}
            attendanceID={attendanceData.id}
          />
        );
      case 'permit':
        return <PermitPage NIK={NIK} />;
      default:
        return null;
    }
  };

  const getAttendance = async () => {
    const token = (await getCookie('token')) || '';
    const res = await new ApiRequest<ParamsReq, AttendanceResData>(
      Endpoint.Attendance,
    )
      .setToken(token)
      .setPathParam(NIK)
      .setParams({ filter: 'all' })
      .get();

    setAttendanceStatus(res.getStatus());
    setAttendanceID(res.getData().id);

    if (res.getStatus() === 200) {
      setAttendanceData(res.getData());
    }
  };

  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'attendance', title: 'Absensi' },
    { key: 'logbook', title: 'Logbook' },
    { key: 'permit', title: 'Izin' },
  ]);

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    // Cek apakah user berpindah ke tab 'Permit'
    if (routes[newIndex].key === 'permit' && attendanceData.permit) {
      Alert.alert(
        'Peringatan',
        'Pengajuan izin dapat dilakukan jika pengajuan sebelumnya sudah dikonfirmasi koordinator atau izin yang diajukan sudah selesai.',
        [
          {
            text: 'Mengerti',
            onPress: () => {
              handleIndexChange(0);
            },
          },
        ],
      );
    }
    // Cek apakah user berpindah ke tab 'LogbookDto'
    if (routes[newIndex].key === 'logbook' && !isCheckedIn) {
      Alert.alert(
        'Peringatan',
        'Pengisian Logbook aktivitas hanya dapat dilakukan jika Anda sudah melakukan Check In.',
        [
          {
            text: 'Mengerti',
            onPress: () => {
              handleIndexChange(0);
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: '#0f172a',
      }}
    >
      <HeaderBar image_profile={profile_photo} role="onsite" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange} // Panggil fungsi ini saat index berubah
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default OnsiteMain;
