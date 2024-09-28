import { View, Text } from 'react-native';
import React from 'react';

interface EmployeeInfoProps {
  NIK: string;
  name: string;
  area: string;
  role: string;
  date?: string;
  status?: string;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ NIK, name, area, role, date, status }) => {
  
  const getStatusColor = () => {
    switch (status) {
      case 'Hadir':
        return 'text-accentGreen';
      case 'Izin':
        return 'text-accentYellow';
      case 'Absen':
        return 'text-red-400';
      default:
        return 'text-textDefault'; 
    }
  };

  return (
    <View className='w-full p-5 border border-accentGreen rounded-lg'>
      <View className='w-full flex gap-3'>
        <View className='w-full flex flex-row justify-between'>
          <Text className='font-bold text-lg text-textDefault'>{NIK}</Text>

          <Text className={`font-bold text-lg ${getStatusColor()}`}>{status}</Text>

        </View>
        <View className='flex flex-row gap-1 w-full justify-between'>
          <Text className='font-bold text-sm w-12 text-textDefault'>Nama</Text>
          <Text className='text-textDefault'>:</Text>
          <Text className='text-textDefault w-60'>{name}</Text>
        </View>
        <View className='flex flex-row gap-1 w-full justify-between'>
          <Text className='font-bold text-sm w-12 text-textDefault'>Area</Text>
          <Text className='text-textDefault'>:</Text>
          <Text className='text-textDefault w-60'>{area}</Text>
        </View>
        <View className='flex flex-row gap-1 w-full justify-between'>
          <Text className='font-bold text-sm w-12 text-textDefault'>Role</Text>
          <Text className='text-textDefault'>:</Text>
          <Text className='text-textDefault w-60'>{role}</Text>
        </View>
        {date ? (
          <View className='flex flex-row gap-1 w-full justify-between'>
            <Text className='font-bold text-sm w-12 text-textDefault'>Date</Text>
            <Text className='text-textDefault'>:</Text>
            <Text className='text-accentGreen w-60'>{date}</Text>
          </View>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default EmployeeInfo;
