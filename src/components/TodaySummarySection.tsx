import { View } from "react-native";
import React from "react";
import TodaySummary from "./TodaySummary";

interface TodaySummarySectionProps {
    presence: number;
    permit: number;
    absent: number;
}

const TodaySummarySection: React.FC<TodaySummarySectionProps> = ({presence, permit, absent}) => {
  return (
    <View className="flex flex-row mb-8 gap-4">
      <View>
        <TodaySummary title="Hadir" value={presence} />
      </View>
      <View>
        <TodaySummary title="Izin" value={permit} />
      </View>
      <View>
        <TodaySummary title="Absen" value={absent} />
      </View>
    </View>
  );
};

export default TodaySummarySection;
