import { View, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBar from './HeaderBar';
import DashboardPage from '../pages/CoordPage/DashboardPage';
import ReportPage from '../pages/CoordPage/ReportPage';


const renderScene = SceneMap({
  dashboard: DashboardPage,
  report: ReportPage,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#ffcc00' }}
    style={{ backgroundColor: '#0f172a' }}
    labelStyle={{color:'#94a3b8', fontWeight:'bold'}}
    activeColor='#ffcc00'
  />
);

const CoordinatorMain = () => {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'dashboard', title: 'Dashboard' },
    { key: 'report', title: 'Laporan' },
  ]);

  return (
     <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: '#0f172a'
    }}>
      <HeaderBar/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
     </View> 
  )
}

export default CoordinatorMain