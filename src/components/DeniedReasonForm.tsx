import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import ButtonCustom from './ButtonCustom';
import { Ionicons } from '@expo/vector-icons';
import { getCookie } from '../utils/getCookie';
import { useNavigation } from '@react-navigation/native';

interface DeniedReasonFormProps {
  setIsModalOpen: (state: boolean) => void;
  isModalOpen: boolean;
  handlePatch: (approvedStatus: boolean, desc: string) => void;
}

const DeniedReasonForm: React.FC<DeniedReasonFormProps> = ({
  setIsModalOpen,
  isModalOpen,
  handlePatch,
}) => {
  const [description, setDescription] = useState<string>('');

  const navigation = useNavigation();

  const isFormValid = () => {
    return description.trim() !== '';
  };

  const clearForm = () => {
    setDescription('');
    setIsModalOpen(false);
  };

  const handleSubmitConfirmation = async () => {
    const token = await getCookie('token');

    if (token) {
      handlePatch(false, description);
    }
    clearForm();
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
                    Alasan Penolakan
                  </Text>

                  {/*close-modal-button*/}
                  <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                    <Ionicons name="close" size={37} color="#94a3b8" />
                  </TouchableOpacity>
                </View>

                {/*description*/}
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  className="border border-accentYellow rounded-lg mt-7 px-3 text-textDefault"
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  placeholder={'Deskripsi anda'}
                  placeholderTextColor={'#94a3b8'}
                />

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

export default DeniedReasonForm;
