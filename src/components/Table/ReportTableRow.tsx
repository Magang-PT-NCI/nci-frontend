import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {ReportResData} from "../../interfaces/report.dto";

interface TableRowProps {
  number: string;
  nik: string;
  name: string;
  date: string;
  working_hours: string;
  status: string;
}

const ReportTableRow: React.FC<TableRowProps> = ({
  number,
  nik,
  working_hours,
  name,
  date,
  status,
}) => {
  const navigation = useNavigation();

  const dataRow : ReportResData  = {
    nik,
    working_hours,
    name,
    date,
    status,
  }

  const getStatusColor = () => {
    switch (status) {
      case "presence":
        status = "Hadir";
        return "bg-accentGreen";
      case "permit":
        status = "Izin";
        return "bg-accentYellow";
      case "absent":
        status = "Absen";
        return "bg-red-400";
      default:
        return "bg-textDefault";
    }
  };

  return (
    <TouchableOpacity
      className="w-full flex flex-row border-b border-accentGreen justify-between items-center py-2"
      activeOpacity={0.5}
      onPress={() => navigation.navigate("OnsiteDetailPage", { dataRow })}
    >
      <View className="w-8 ">
        <Text className=" text-accentGreen font-bold">{number}.</Text>
      </View>
      <View className="w-36 ">
        <Text className="text-center text-accentGreen font-bold">{nik}</Text>
      </View>
      <View className="w-40 pl-4">
        <Text className=" text-accentGreen">{name}</Text>
      </View>
      <View className="w-28">
        <Text className="text-center text-accentGreen">{date}</Text>
      </View>
      <View className="w-36 ">
        <Text className="text-center text-accentGreen">{working_hours}</Text>
      </View>
      <View className={`w-20 ${getStatusColor()} rounded-lg py-1 items-center`}>
        <Text className=" text-background font-semibold text-xs">{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReportTableRow;
