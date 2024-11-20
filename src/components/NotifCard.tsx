import { View, Text, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
//import { useNavigation } from '@react-navigation/native';
import {
  ApprovalReqBody,
  ApprovalResData,
  NotificationResData,
} from '../interfaces/notification.dto';
import ButtonCustom from './ButtonCustom';
import { getCookie } from '../utils/getCookie';
import ApiRequest from '../utils/ApiRequest';
import { ATTENDANCE_URL } from '../config/app.config';
import customConfirmDialogue from '../utils/customConfirmDialogue';
import DeniedReasonForm from './DeniedReasonForm';

interface NotifCardProps {
  notif: NotificationResData;
  role: 'onsite' | 'coordinator';
  removeNotification: () => void;
}

const NotifCard: React.FC<NotifCardProps> = ({
  notif,
  role,
  removeNotification,
}) => {
  //const navigation = useNavigation();
  const [formModalOpen, setFormModalOpen] = useState(false);

  const patchNotifStatus = async (approved: boolean, desc?: string) => {
    const token = (await getCookie('token')) || '';
    const NIK = await getCookie('NIK');
    await new ApiRequest<ApprovalReqBody, ApprovalResData>()
      .setToken(token)
      .setURL(ATTENDANCE_URL + notif.action_endpoint)
      .setReqBody({ approved, denied_description: desc, approval_nik: NIK })
      .patch(() => removeNotification());
  };

  const handleApprove = () => {
    customConfirmDialogue(
      'Konfirmasi Persetujuan',
      'Apakah Anda yakin akan MENYETUJUI pengajuan?',
      () => {},
      () => patchNotifStatus(true),
    );
  };

  const handleReject = () => {
    customConfirmDialogue(
      'Konfirmasi Persetujuan',
      'Apakah Anda yakin akan MENOLAK pengajuan?',
      () => {},
      () => {
        setFormModalOpen(true);
      },
    );
  };

  const handleOpenFile = () => {
    Linking.openURL(notif.file);
  };

  return (
    <View className="w-full">
      {/*body*/}
      <View className="w-full border-b border-b-accentGreen bg-background py-6">
        <View className="flex flex-row items-center justify-between">
          {role === 'coordinator' ? (
            <Text className="text-lg text-textDefault">{notif.name}</Text>
          ) : (
            ''
          )}

          <Text
            className={` text - lg text-accentYellow ${role === 'onsite' ? 'w-full text-right' : ''}`}
          >
            {notif.date}
          </Text>
        </View>

        <Text className="text-sm text-textDefault mt-3 ml-2">
          {notif.message}
        </Text>

        {notif.file ? (
          <TouchableOpacity onPress={handleOpenFile}>
            <View className="w-40 p-1 flex flex-row mt-2 items-center ">
              <View className="mr-3">
                <Ionicons name={'eye'} size={28} color="gray" />
              </View>
              <View>
                <Text className="text-sm text-textDefault">
                  Lihat File Bukti
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}

        {notif.action_endpoint ? (
          <View className="flex flex-row mt-3">
            <View className="w-32 mr-2">
              <ButtonCustom
                title="Izinkan"
                callbackEvt={handleApprove}
                color="#5CB874"
              />
            </View>
            <View className="w-32">
              <ButtonCustom
                title="Tolak"
                callbackEvt={handleReject}
                color="#EB5757"
              />
            </View>
          </View>
        ) : (
          ''
        )}
      </View>

      <DeniedReasonForm
        setIsModalOpen={setFormModalOpen}
        isModalOpen={formModalOpen}
        handlePatch={patchNotifStatus}
      />
    </View>
  );
};

export default NotifCard;
