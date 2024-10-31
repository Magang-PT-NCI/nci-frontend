import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NotifCard from '../../components/NotifCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCookie } from '../../utils/getCookie';
import ApiRequest from '../../utils/ApiRequest';
import { ParamsReq } from '../../interfaces/api-request';
import { NotificationResData } from '../../interfaces/notification.dto';
import { Endpoint } from '../../enums/endpoint-class';

const NotificationPage = ({ route }) => {
  const { role } = route.params;

  const [notifData, setNotifData] = useState([] as NotificationResData[]);
  const navigation = useNavigation();

  const getNotification = async () => {
    const token = (await getCookie('token')) || '';
    const response = await new ApiRequest<ParamsReq, NotificationResData[]>(
      Endpoint.Notification,
    )
      .setToken(token)
      .setParams({})
      .get();

    // console.log(JSON.stringify(response.getData(), null, 2));

    setNotifData(response.getData());
  };

  const removeNotif = (index: number) => {
    return () => setNotifData((prev) => prev.filter((value, i) => i !== index));
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <SafeAreaView className="bg-background h-full ">
      {/*header*/}
      <View className="flex flex-row items-center m-4 mb-2 mt-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back-outline'} size={28} color="gray" />
        </TouchableOpacity>
        <Text className="font-bold text-xl text-accentYellow text-left ml-3">
          Notifikasi
        </Text>
      </View>
      <ScrollView
        // @ts-ignore
        style={{ showsVerticalScrollIndicator: false }}
      >
        <View className="w-full h-full bg-background p-4 pt-0 pb-32">
          {notifData.map((notif, index) => (
            <NotifCard
              key={index}
              notif={notif}
              role={role}
              removeNotification={removeNotif(index)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationPage;
