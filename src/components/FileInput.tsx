import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';

interface FileInputProps {
  onFileSelect: (file: DocumentPicker.DocumentPickerResult) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setFileName(result.assets[0].name);
      onFileSelect(result); // Passing the selected file back to parent
    } else {
      Alert.alert('Pemilihan file dibatalkan');
    }
  };

  return (
    <View className="w-full mt-4">
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Feather name="upload" size={24} color="#5cb874" />
        <Text className="ml-2 text-base text-green-500">Pilih File</Text>
      </TouchableOpacity>
      {fileName && <Text className="mt-2 text-gray-500">File: {fileName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#5cb874',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default FileInput;
