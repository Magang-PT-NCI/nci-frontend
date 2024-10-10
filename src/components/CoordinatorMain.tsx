import { View, useWindowDimensions } from "react-native";
import React from "react";
import { TabView, TabBar } from "react-native-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderBar from "./HeaderBar";
import DashboardPage from "../pages/CoordPage/DashboardPage";
import ReportPage from "../pages/CoordPage/ReportPage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../utils/StackParamList";

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#ffcc00" }}
    style={{ backgroundColor: "#0f172a" }}
    labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
    activeColor="#ffcc00"
  />
);

type CoordinatorMainProps = NativeStackScreenProps<
  StackParamList,
  "CoordinatorMain"
>;

const CoordinatorMain: React.FC<CoordinatorMainProps> = ({ route }) => {
  const { profile_photo } = route.params;
  const { NIK } = route.params;
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();

  interface renderSceneProps {
    route: { key: string; title: string };
  }

  const renderScene = ({ route }: renderSceneProps) => {
    switch (route.key) {
      case "dashboard":
        return <DashboardPage />;
      case "report":
        return <ReportPage />;
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "dashboard", title: "Dashboard" },
    { key: "report", title: "Laporan" },
  ]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#0f172a",
      }}
    >
      <HeaderBar image_profile={profile_photo} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default CoordinatorMain;
