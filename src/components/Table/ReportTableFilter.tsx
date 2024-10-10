import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import DateItem from "../DateItem";
import { Ionicons } from "@expo/vector-icons";

const ReportTableFilter = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    console.log("Tanggal terpilih:", date);
  };
  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    console.log("Tanggal terpilih:", date);
  };

  return (
    <View className="w-full">
      <View className="w-full flex-row items-center px-3 py-2 rounded-xl bg-customGray border border-accentGreen mb-4">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          className="w-full text-textDefault ml-2"
          placeholder="Cari ..."
          placeholderTextColor={"#94a3b8"}
          style={{ fontSize: 14 }}
        />
      </View>

      <View className="w-1/2 flex flex-row gap-4 mb-2">
        <View>
          <Text className="text-accentYellow mb-2">Tanggal Awal</Text>
          <DateItem
            key={"start_date"}
            type="inner"
            onDateChange={handleStartDateChange}
          />
        </View>

        <View>
          <Text className="text-accentYellow mb-2">Tanggal Akhir</Text>
          <DateItem
            key={"end_date"}
            type="inner"
            onDateChange={handleEndDateChange}
          />
        </View>
      </View>
    </View>
  );
};

export default ReportTableFilter;
