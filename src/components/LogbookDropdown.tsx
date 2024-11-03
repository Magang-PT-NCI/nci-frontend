import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { getCookie } from '../utils/getCookie';
import ApiRequest from '../utils/ApiRequest';
import { ATTENDANCE_URL } from '../config/app.config';
import {
  LogbookUpdateReqBody,
  LogbookUpdateResData,
} from '../interfaces/logbook.dto';

interface LogbookDropdownProps {
  placeholder?: string;
  status: string;
  data: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  isDisabled?: boolean;
  id: number;
  getAttendance: () => void;
}

const LogbookDropdown: React.FC<LogbookDropdownProps> = ({
  placeholder = 'Select item',
  status,
  data,
  onValueChange,
  isDisabled,
  id,
  getAttendance,
}) => {
  const [logbookValue, setLogbookValue] = useState<string>('');

  const updateStatus = async (status: string) => {
    const token = (await getCookie('token')) || '';
    await new ApiRequest<LogbookUpdateReqBody, LogbookUpdateResData>()
      .setToken(token)
      .setURL(`${ATTENDANCE_URL}/logbook/${id}`)
      .setReqBody({ status: status })
      .patch(() => getAttendance());
  };

  useEffect(() => {
    setLogbookValue(status);
  }, []);

  return (
    <View className="w-full">
      <Dropdown
        style={{
          height: 30,
          width: 100,
          backgroundColor: logbookValue === 'done' ? '#16A34A' : '#3B82F6',
          borderRadius: 4,
          padding: 10,
        }}
        disable={isDisabled}
        placeholderStyle={{
          fontSize: 14,
          fontWeight: 600,
          color: '#0f172a',
        }}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={logbookValue}
        onChange={(item) => {
          setLogbookValue(item.value);
          onValueChange(item.value);
          updateStatus(item.value);
        }}
      />
    </View>
  );
};

export default LogbookDropdown;

const styles = StyleSheet.create({
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0f172a',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#0f172a',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
