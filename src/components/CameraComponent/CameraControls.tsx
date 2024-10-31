import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CameraControlsProps = {
  onToggleFacing?: () => void;
  onCapture?: () => void;
  onCancel?: () => void;
  requestPermission?: () => void;
};

const CameraControls: React.FC<CameraControlsProps> = ({
  onToggleFacing,
  onCapture,
  onCancel,
  requestPermission,
}) => {
  if (requestPermission) {
    requestPermission();
    return;
  }

  return (
    <View className="absolute bottom-10 w-full flex-row justify-between px-10">
      <TouchableOpacity
        onPress={onToggleFacing}
        className="bg-blue-500 p-3 rounded"
      >
        <Ionicons name="repeat-outline" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCapture}
        className="bg-green-500 p-3 rounded"
      >
        <Ionicons name="camera" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} className="bg-red-500 p-3 rounded">
        <Ionicons name="close-circle" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default CameraControls;
