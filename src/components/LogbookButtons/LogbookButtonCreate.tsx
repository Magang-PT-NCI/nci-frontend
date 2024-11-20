import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonCustom from '../ButtonCustom';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropdownCustom from '../DropdownCustom';
import ApiRequest from '../../utils/ApiRequest';
import { Endpoint } from '../../enums/endpoint-class';
import { getCookie } from '../../utils/getCookie';
import { LogbookReqBody, LogbookResData } from '../../interfaces/logbook.dto';
import {
  ValidateTokenReqBody,
  ValidateTokenResData,
} from '../../interfaces/auth.dto';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ParamsReq } from '../../interfaces/api-request';
import { AttendanceResData } from '../../interfaces/attendance.dto';

interface LogbookButtonCreateProps {
  attendanceID: number;
  onSubmit: (logbook: LogbookResData) => void;
}

const LogbookButtonCreate: React.FC<LogbookButtonCreateProps> = ({
  attendanceID,
  onSubmit,
}) => {
  const [attendanceDate, setAttendanceDate] = useState<Date>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedTimeButton, setSelectedTimeButton] = useState<
    'start' | 'end' | null
  >(null);
  const [startTime, setStartTime] = useState<Date>(null);
  const [endTime, setEndTime] = useState<Date>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [activityDescription, setActivityDescription] = useState<string>('');
  // console.log('[logbookButtonCreate] Create]', attendanceID);
  const showDatePicker = (button: 'start' | 'end') => {
    setSelectedTimeButton(button);
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleConfirm = (date: Date) => {
    if (selectedTimeButton === 'start') {
      if (
        (endTime && date.getTime() > endTime.getTime()) ||
        (attendanceDate && attendanceDate.getTime() > date.getTime())
      ) {
        Alert.alert(
          'Peringatan',
          'Jam mulai tidak bisa melebihi jam selesai atau lebih awal dari jam checkin.',
          [
            {
              text: 'Mengerti',
              onPress: () => {
                hideDatePicker();
              },
            },
          ],
        );
        return;
      }
      setStartTime(date);
    } else if (selectedTimeButton === 'end') {
      if (startTime && date.getTime() < startTime.getTime()) {
        Alert.alert(
          'Peringatan',
          'Jam selesai tidak bisa lebih awal dari jam mulai.',
          [
            {
              text: 'Mengerti',
              onPress: () => {
                hideDatePicker();
              },
            },
          ],
        );
        return;
      }
      setEndTime(date);
    }

    hideDatePicker();
  };

  const logbook_status = [
    { label: 'done', value: 'done' },
    { label: 'progress', value: 'progress' },
  ];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleSubmitLogbook = async () => {
    if (isFormValid()) {
      const token = await getCookie('token');
      if (token) {
        console.log({
          attendance_id: attendanceID,
          start_time: startTime,
          end_time: endTime,
          status: selectedStatus,
          description: activityDescription,
        });
        const response = await new ApiRequest<LogbookReqBody, LogbookResData>(
          Endpoint.Logbook,
        )
          .setToken(token)
          .setReqBody({
            attendance_id: attendanceID,
            start_time: formatTime(startTime),
            end_time: formatTime(endTime),
            status: selectedStatus,
            description: activityDescription,
          })
          .post();

        onSubmit(response.getData());
        setStartTime(null);
        setEndTime(null);
        setActivityDescription('');
        setIsModalOpen(false);
      }
    }
  };

  const isFormValid = () => {
    return (
      startTime !== null &&
      endTime !== null &&
      selectedStatus !== null &&
      activityDescription.trim() !== ''
    );
  };

  const navigation = useNavigation();
  const validate = async () => {
    const token = await getCookie('token');

    if (token) {
      await new ApiRequest<ValidateTokenReqBody, ValidateTokenResData>(
        Endpoint.ValidateToken,
      )
        .setReqBody({ token: token })
        .post(
          (data) => {
            getAttendanceData(data.nik);
          },
          (error) => navigation.dispatch(StackActions.replace('LoginPage')),
        );
    } else {
      navigation.dispatch(StackActions.replace('LoginPage'));
    }
  };

  const getAttendanceData = async (NIK: string) => {
    const token = (await getCookie('token')) || '';
    const res = await new ApiRequest<ParamsReq, AttendanceResData>(
      Endpoint.Attendance,
    )
      .setToken(token)
      .setPathParam(NIK)
      .setParams({ filter: 'all' })
      .get();
    if (res.getStatus() === 200) {
      const checkIn = res.getData().checkIn;
      if (checkIn) {
        const checkInTime = checkIn?.time.split(':');
        const hour = parseInt(checkInTime[0]);
        const minute = parseInt(checkInTime[1]);

        const date = new Date();

        date.setHours(hour);
        date.setMinutes(minute);

        setAttendanceDate(date);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await validate();
    })();
  }, []);

  return (
    <View className="w-1/4 mt-3">
      <View className="w-full">
        <ButtonCustom
          title="Create+"
          callbackEvt={() => setIsModalOpen(true)}
        />
      </View>

      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalOpen(false)}>
          <View className="h-full p-3 pt-10 bg-black/40">
            <TouchableWithoutFeedback>
              <View
                className="w-full border rounded-lg p-5"
                style={{ borderColor: '#5cb874', backgroundColor: '#0f172a' }}
              >
                <View className="w-full flex-row justify-between items-center">
                  <Text className="text-textDefault text-lg">
                    Buat Aktivitas
                  </Text>
                  <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                    <Ionicons name="close" size={37} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center mt-4">
                  <View className="w-28 mr-2">
                    <ButtonCustom
                      title={startTime ? formatTime(startTime) : 'Jam Masuk'}
                      callbackEvt={() => {
                        showDatePicker('start');
                      }}
                    />
                  </View>
                  <View className="w-28">
                    <ButtonCustom
                      title={endTime ? formatTime(endTime) : 'Jam Selesai'}
                      callbackEvt={() => showDatePicker('end')}
                    />
                  </View>
                </View>
                <DateTimePicker
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <DropdownCustom
                  data={logbook_status}
                  onValueChange={handleStatusChange}
                  placeholder="Pilih status aktivitas"
                  marginT={16}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  className="border border-accentYellow rounded-lg mt-7 px-3 text-textDefault"
                  onChangeText={(text) => setActivityDescription(text)}
                  value={activityDescription}
                />

                <ButtonCustom
                  title="Kirim"
                  callbackEvt={handleSubmitLogbook}
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

export default LogbookButtonCreate;
