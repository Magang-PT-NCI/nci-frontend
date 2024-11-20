import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DropdownCustom from './DropdownCustom';
import LogbookDropdown from './LogbookDropdown';
import ButtonCustom from './ButtonCustom';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getCookie } from '../utils/getCookie';
import ApiRequest from '../utils/ApiRequest';
import {
  LogbookUpdateReqBody,
  LogbookUpdateResData,
} from '../interfaces/logbook.dto';
import { ATTENDANCE_URL } from '../config/app.config';

interface LogbookCardProps {
  timeStart: string;
  timeEnd: string;
  desc: string;
  status: string;
  id: number;
  role?: 'onsite' | 'coord';
  getAttendance: () => void;
}

const LogbookCard: React.FC<LogbookCardProps> = ({
  timeStart,
  timeEnd,
  desc,
  status,
  id,
  role = 'onsite',
  getAttendance,
}) => {
  const statusData = [
    { label: 'done', value: 'done' },
    { label: 'progress', value: 'progress' },
  ];

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [endTime, setEndTime] = useState<string>(timeEnd);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const updateEndTime = async (newTime: string) => {
    const token = (await getCookie('token')) || '';
    await new ApiRequest<LogbookUpdateReqBody, LogbookUpdateResData>()
      .setToken(token)
      .setURL(`${ATTENDANCE_URL}/logbook/${id}`)
      .setReqBody({ end_time: newTime })
      .patch(
        () => getAttendance(),
        () => console.log(`[LogbookDropdown] update endTime: ${endTime}`),
      );
  };

  const showTimePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    setEndTime(formattedTime);
    updateEndTime(formattedTime);
    hideTimePicker();
  };

  return (
    <View className="w-full p-5 pb-4 border border-accentGreen rounded-lg mb-4">
      <View className="flex flex-row justify-between">
        <View className="w-[100] h-[30]">
          <Text className=" bg-accentYellow rounded px-2 py-1 text-background font-bold text-sm text-center">
            {timeStart}
          </Text>
        </View>
        {role === 'onsite' ? (
          <TouchableOpacity
            className="w-[100] h-[30] "
            onPress={showTimePicker}
          >
            <Text className=" bg-accentYellow rounded px-2 py-1 text-background font-bold text-sm text-center">
              {endTime}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="w-[100] h-[30]">
            <Text className=" bg-accentYellow rounded px-2 py-1 text-background font-bold text-sm text-center">
              {endTime}
            </Text>
          </View>
        )}

        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
        <View>
          <LogbookDropdown
            getAttendance={getAttendance}
            id={id}
            status={status}
            data={statusData}
            onValueChange={handleStatusChange}
            isDisabled={role === 'coord'}
          />
        </View>
      </View>
      <Text className="text-textDefault text-sm mt-5 text-justify ">
        {desc}
      </Text>
    </View>
  );
};

export default LogbookCard;
