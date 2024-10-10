import { View } from "react-native";
import React from "react";
import TodaySummary from "./TodaySummary";

const TodaySummarySection = () => {
  return (
    <View className="flex flex-row mb-8 gap-4">
      <View>
        <TodaySummary title="Hadir" value="12" />
      </View>
      <View>
        <TodaySummary title="Izin" value="1" />
      </View>
      <View>
        <TodaySummary title="Absen" value="2" />
      </View>
    </View>
  );
};

export default TodaySummarySection;
