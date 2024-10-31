import { View, Text } from 'react-native';
import React from 'react';
// @ts-ignore
import FailIcon from '../../assets/icons/errorIcon';

interface AlertLoginProps {
  message?: string;
}

const AlertLogin: React.FC<AlertLoginProps> = ({ message }) => {
  return (
    <View className="w-full bg-red-400 rounded-xl  border border-red-500 flex flex-row items-center py-3 px-5">
      <FailIcon width={30} height={30} />
      <View className="ml-2">
        <Text className="text-xs italic text-red-800">{message}</Text>
      </View>
    </View>
  );
};

export default AlertLogin;
