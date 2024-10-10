import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface TableRowProps {
  number: string;
  nik: string;
  name: string;
  date: string;
  status: string;
}

const ReportTableRow: React.FC<TableRowProps> = ({
  number,
  nik,
  name,
  date,
  status,
}) => {
  const navigation = useNavigation();

  const getStatusColor = () => {
    switch (status) {
      case "Hadir":
        return "bg-accentGreen";
      case "Izin":
        return "bg-accentYellow";
      case "Absen":
        return "bg-red-400";
      default:
        return "bg-textDefault";
    }
  };

  return (
    <TouchableOpacity
      className="w-full flex flex-row border-b border-accentGreen justify-between items-center py-2"
      activeOpacity={0.5}
      onPress={() => navigation.navigate("OnsiteDetailPage")}
    >
      <View className="w-8 ">
        <Text className=" text-accentGreen font-bold">{number}.</Text>
      </View>
      <View className="w-36 ">
        <Text className="text-center text-accentGreen font-bold">{nik}</Text>
      </View>
      <View className="w-40">
        <Text className="text-center text-accentGreen">{name}</Text>
      </View>
      <View className="w-28">
        <Text className="text-center text-accentGreen">{date}</Text>
      </View>
      <View className={`w-20 ${getStatusColor()} rounded-lg py-1 items-center`}>
        <Text className=" text-background font-semibold text-xs">{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReportTableRow;
