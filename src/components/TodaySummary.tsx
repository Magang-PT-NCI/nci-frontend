import { View, Text } from "react-native";
import React from "react";

interface TodaySUmmaryProps {
  title: string;
  value: number;
}

const TodaySummary: React.FC<TodaySUmmaryProps> = ({ title, value }) => {
  return (
    <View className="border border-accentGreen w-28 p-2 bg-background flex justify-center items-center rounded-lg">
      <Text className="text-accentGreen text-sm">
        {title}: {value}
      </Text>
    </View>
  );
};

export default TodaySummary;
