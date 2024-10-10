import { View, Text } from "react-native";
import React from "react";

interface EmployeeInfoProps {
  NIK: string;
  name: string;
  area: string;
  role: string;
  date?: string;
  status?: string;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
  NIK,
  name,
  area,
  role,
  date,
  status,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "Hadir":
        return "text-accentGreen";
      case "Izin":
        return "text-accentYellow";
      case "Absen":
        return "text-red-400";
      default:
        return "text-textDefault";
    }
  };

  return (
    <View className="w-full p-5 border border-accentGreen rounded-lg mb-3">
      <View className="w-full">
        <View className="w-full flex flex-row justify-between mb-3">
          <Text className="font-bold text-lg text-textDefault">{NIK}</Text>

          <Text className={`font-bold text-lg ${getStatusColor()}`}>
            {status}
          </Text>
        </View>
        <View className="flex flex-row w-full h-9 mb-2 items-center">
          <Text className="font-bold text-sm w-1/5 text-textDefault">Nama</Text>
          <Text className="text-textDefault mr-4">: </Text>
          <Text className="text-textDefault">{name}</Text>
        </View>
        <View className="flex flex-row w-full h-9 mb-2 items-center ">
          <Text className="font-bold text-sm w-1/5 text-textDefault">Area</Text>
          <Text className="text-textDefault mr-4">: </Text>
          <Text className="text-textDefault">{area}</Text>
        </View>
        <View className="flex flex-row w-full h-9 mb-2 items-center ">
          <Text className="font-bold text-sm w-1/5 text-textDefault">Role</Text>
          <Text className="text-textDefault mr-4">: </Text>
          <Text className="text-textDefault">{role}</Text>
        </View>
        {date ? (
          <View className="flex flex-row w-full h-9 mb-2 items-center ">
            <Text className="font-bold text-sm w-1/5 text-textDefault">
              Date
            </Text>
            <Text className="text-textDefault mr-4">: </Text>
            <Text className="text-accentGreen">{date}</Text>
          </View>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default EmployeeInfo;
