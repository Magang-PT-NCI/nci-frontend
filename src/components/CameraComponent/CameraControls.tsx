import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CameraControlsProps = {
  onToggleFacing: () => void;
  onCapture: () => void;
  onCancel: () => void;
  requestPermission?: () => void;
};

const CameraControls: React.FC<CameraControlsProps> = ({ 
  onToggleFacing, 
  onCapture, 
  onCancel,
  requestPermission
}) => {
  if (requestPermission) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center pb-4">Aplikasi membutuhkan izin kamera perangkat</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-blue-500 p-2 rounded">
          <Text className="text-white">Izin Akses Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="absolute bottom-10 w-full flex-row justify-between px-10">
      <TouchableOpacity onPress={onToggleFacing} className="bg-blue-500 p-3 rounded">
        <Ionicons name='repeat-outline' size={24}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCapture} className="bg-green-500 p-3 rounded">
        <Text className="text-background">Capture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} className="bg-red-500 p-3 rounded">
        <Text className="text-background">Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraControls;
