import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
// @ts-ignore
import NotifBellIcon from '../../assets/icons/notificationsIcon';
import ButtonCustom from './ButtonCustom';
import { removeCookie } from '../utils/removeCookie';
import { useNavigation, StackActions } from '@react-navigation/native';
import customConfirmDialogue from '../utils/customConfirmDialogue';

interface HeaderBarProps {
  image_profile: string;
  role: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ image_profile, role }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleLogout = async () => {
    customConfirmDialogue(
      'Konfirmasi',
      'Keluar aplikasi?',
      () => {},
      () => {
        navigation.dispatch(StackActions.replace('LoginPage'));
      },
    );
    removeCookie('token');
  };

  return (
    <View className="w-full  bg-background border-b border-b-accentGreen flex flex-row justify-between items-center py-5 px-4">
      <View className="flex flex-row justify-center items-center gap-2">
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/v2/C560BAQFILYYv97IvhQ/company-logo_200_200/company-logo_200_200/0/1630645192893?e=2147483647&v=beta&t=LLeV0gvzIJcOq1ap_efrUFmmr_3l72HKDUrqR1E8SMg',
          }}
          className="w-9 h-9 rounded"
        />

        <Text className="font-bold text-accentGreen">
          PT Nuansa Cerah Informasi
        </Text>
      </View>

      <View className="flex flex-row justify-center items-center gap-4">
        <View className="mr-2">
          <TouchableOpacity
            //@ts-ignore
            onPress={() => navigation.navigate('NotificationPage', { role })}
            activeOpacity={0.5}
          >
            <NotifBellIcon height={34} width={34} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: image_profile }}
            className="w-9 h-9 rounded-lg"
          />
        </TouchableOpacity>
      </View>

      <Modal
        style={{ width: 5 }}
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className=" h-full"
          onPress={() => setModalVisible(false)}
        >
          <View className="w-full h-10 items-end p-10">
            <View className="w-32 h-16">
              <ButtonCustom
                icon="exit-outline"
                title="Keluar"
                callbackEvt={handleLogout}
                color="#F05252"
                textSize={13}
                lineHeight={16}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HeaderBar;
