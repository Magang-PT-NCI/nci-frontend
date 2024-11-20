import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import ButtonCustom from './ButtonCustom';
import DropdownCustom from './DropdownCustom';
import { Ionicons } from '@expo/vector-icons';
import { getCookie } from '../utils/getCookie';
import ApiRequest from '../utils/ApiRequest';
import { OvertimeResData } from '../interfaces/overtime.dto';
import { Endpoint } from '../enums/endpoint-class';
import { StackActions, useNavigation } from '@react-navigation/native';
import FileInput from './FileInput';
import * as DocumentPicker from 'expo-document-picker';
import { AttendanceResData } from '../interfaces/attendance.dto';

interface ConfirmationFormProps {
  setIsModalOpen: (state: boolean) => void;
  isModalOpen: boolean;
  attendanceData: AttendanceResData;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  setIsModalOpen,
  isModalOpen,
  attendanceData,
}) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);

  const navigation = useNavigation();

  const confirm_type = [
    { label: 'Check in', value: 'check_in' },
    { label: 'Check out', value: 'check_out' },
    { label: 'Izin', value: 'permit' },
  ];

  const confirm_reason = [
    { label: 'Sakit', value: 'sakit' },
    { label: 'Urusan mendadak', value: 'urusan_mendadak' },
    { label: 'Cuti', value: 'cuti' },
    { label: 'Duka', value: 'duka' },
    { label: 'Melahirkan', value: 'melahirkan' },
    { label: 'Lainnya', value: 'lainnya' },
  ];

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
  };

  const isFormValid = () => {
    return (
      confirm_type !== null &&
      confirm_reason !== null &&
      description.trim() !== '' &&
      selectedFile !== null
    );
  };

  const clearForm = () => {
    setSelectedType('');
    setDescription('');
    setSelectedReason('');
    setIsModalOpen(false);
  };

  const handleSubmitConfirmation = async () => {
    const token = await getCookie('token');
    const formdata = new FormData();

    const file = selectedFile?.assets[0];

    if (token) {
      formdata.append('attendance_id', `${attendanceData.id}`);
      formdata.append('type', selectedType);
      formdata.append('reason', selectedReason);
      formdata.append('description', description);
      formdata.append('attachment', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as unknown as Blob);

      await new ApiRequest<FormData, OvertimeResData>(Endpoint.ValidatePresence)
        .setToken(token)
        .setContentType('multipart/form-data')
        .setReqBody(formdata)
        .post(
          (data) => {
            Alert.alert(
              'Pemberitahuan',
              'Konfirmasi kehadiran berhasil dikirim',
              [
                {
                  text: 'Mengerti',
                  onPress: () => {
                    clearForm();
                  },
                },
              ],
            );
          },
          (error) => {
            Alert.alert('Pemberitahuan', error.message, [
              {
                text: 'Mengerti',
                onPress: () => {},
              },
            ]);
          },
        );
    } else {
      navigation.dispatch(StackActions.replace('LoginPage'));
    }
  };

  const handleFileSelect = (file: DocumentPicker.DocumentPickerResult) => {
    setSelectedFile(file);
  };

  return (
    <View>
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalOpen(false)}>
          <View className="h-full p-4 bg-black/60">
            <TouchableWithoutFeedback>
              <View
                className="w-full border rounded-lg p-5 py-10 my-auto"
                style={{ borderColor: '#5cb874', backgroundColor: '#0f172a' }}
              >
                <View className="w-full flex-row justify-between items-center">
                  <Text className="text-accentYellow text-lg">
                    Formulir Konfirmasi Absensi
                  </Text>

                  {/*close-modal-button*/}
                  <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                    <Ionicons name="close" size={37} color="#94a3b8" />
                  </TouchableOpacity>
                </View>

                {/*dropdown-type*/}
                <DropdownCustom
                  data={confirm_type}
                  onValueChange={handleTypeChange}
                  placeholder="Pilih jenis konfirmasi"
                  marginT={16}
                />

                {/*dropdown-reason*/}
                <DropdownCustom
                  isDisabled={selectedType !== 'permit'}
                  data={confirm_reason}
                  onValueChange={handleReasonChange}
                  placeholder="Pilih alasan"
                  marginT={16}
                />

                {/*description*/}
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  className="border border-accentYellow rounded-lg mt-7 px-3 text-textDefault"
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  placeholder={'Deskripsi konfirmasi kehadiran'}
                  placeholderTextColor={'#94a3b8'}
                />

                {/*attachment*/}
                <FileInput onFileSelect={handleFileSelect} />

                {/*button-submit*/}
                <ButtonCustom
                  title="Kirim"
                  callbackEvt={handleSubmitConfirmation}
                  mt={20}
                  disabled={!isFormValid()}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ConfirmationForm;
