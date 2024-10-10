import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeInfo from "../../components/EmployeeInfo";

const OnSiteDetailPage = () => {
  return (
    <SafeAreaView>
      <View className="w-full h-full flex bg-background p-4">
        <Text className="font-bold text-xl text-accentYellow text-left my-4">
          Detail Info OnSite
        </Text>
        <EmployeeInfo
          NIK="001230045600700"
          name="John Doe"
          area="Bandung"
          role="Programmer"
          date="2024-09-24"
          status="Hadir"
        />
      </View>
    </SafeAreaView>
  );
};

export default OnSiteDetailPage;
