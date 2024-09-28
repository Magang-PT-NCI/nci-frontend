import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ViewView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CameraPreviewProps = {
  photo: string;
  onRetake: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const CameraPreview: React.FC<CameraPreviewProps> = ({ photo, onRetake, onSave, onCancel }) => {
  return (
    <View className="flex-1 justify-center items-center ">
      <ImageBackground source={{ uri: photo }} style={styles.imagePreview}>

      <View className="flex-row justify-center  gap-8 w-full p-10">
        <TouchableOpacity onPress={onRetake} className="bg-yellow-500 p-3 px-5 rounded">
          <Text className="text-white">Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} className="bg-green-500 p-3 px-5 rounded">
          <Text className="text-white">Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} className="bg-red-500 p-3 px-5 rounded">
          <Text className="text-white">Cancel</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    justifyContent:'flex-end',
    width: '100%',
    height: '100%',
    aspectRatio: 1, // Ensure image stays in 1:1 ratio
  },
});

export default CameraPreview;
