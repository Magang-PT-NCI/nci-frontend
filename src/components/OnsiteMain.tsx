import { View, Alert, useWindowDimensions } from 'react-native';
import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AttendancePage from '../pages/OnSitePage/AttendancePage';
import LogbookPage from '../pages/OnSitePage/LogbookPage';
import PermitPage from '../pages/OnSitePage/PermitPage';
import HeaderBar from './HeaderBar';

const renderScene = SceneMap({
  attendance: AttendancePage,
  logbook: LogbookPage,
  permit: PermitPage,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#ffcc00' }}
    style={{ backgroundColor: '#0f172a' }}
    labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
    activeColor='#ffcc00'
  />
);

const OnsiteMain = () => {
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
    if (routes[newIndex].key === 'permit') {
      Alert.alert(
        "Peringatan", 
        "Pengajuan izin dapat dilakukan jika pengajuan sebelumnya sudah dikonfirmasi koordinator atau izin yang diajukan sudah selesai.", 
        [
          { text: "Mengerti", onPress: () => { console.log('Alert ditampilkan di PermitPage') } }
        ]
      );
    }
  };

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: '#0f172a'
    }}>
      <HeaderBar />
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
