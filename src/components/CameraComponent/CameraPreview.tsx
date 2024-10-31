import React from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CameraPreviewProps = {
  photo: string;
  onRetake: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const CameraPreview: React.FC<CameraPreviewProps> = ({
  photo,
  onRetake,
  onSave,
  onCancel,
}) => {
  return (
    <View className="flex-1 justify-center items-center">
      {/* Set ImageBackground to fixed 300x300 size */}
      <ImageBackground
        source={{ uri: photo }}
        className="w-96 h-96 justify-end"
      >
        {/* Kontrol untuk Retake, Save, dan Cancel */}
      </ImageBackground>

      <View className="flex-row justify-center mt-5 space-x-4">
        <TouchableOpacity
          onPress={onRetake}
          className="bg-blue-500 p-3 rounded-lg"
        >
          <Ionicons name="reload-circle" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSave}
          className="bg-green-500 p-3 rounded-lg"
        >
          <Ionicons name="save" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCancel}
          className="bg-red-500 p-3 rounded-lg"
        >
          <Ionicons name="close-circle" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraPreview;
