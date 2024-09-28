import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type ImageAttendanceProps = {
  checkInTime?: string;
  checkOutTime?: string;
};

const ImageAttendance: React.FC<ImageAttendanceProps> = ({ checkInTime, checkOutTime }) => {
  return (
    <View className="w-full flex flex-row justify-center items-center p-4">
      <View className='flex justify-center items-center mr-8'>
        <View style={styles.imageBox} className="justify-center items-center">
          <Ionicons name='image-outline' size={24} color={'#5cb874'} />
        </View>
        <View className="mt-4 items-center">
          <Text className="text-sm text-textDefault">{checkInTime ? `Check In: ${checkInTime}` : ' '}</Text>
        </View>
      </View>


      <View className='flex justify-center items-center'>
        <View style={styles.imageBox} className="justify-center items-center">
          <Ionicons name='image-outline' size={24} color={'#5cb874'} />
        </View>
        <View className="mt-4 items-center">
          <Text className="text-sm text-textDefault">{checkOutTime ? `Check Out: ${checkOutTime}` : ' '}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  imageBox: {
    width: 160,
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5cb874',
    borderStyle: 'dashed', 
  },
};

export default ImageAttendance;
