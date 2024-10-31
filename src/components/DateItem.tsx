import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

interface DateItemProps {
  onDateChange?: (date: string) => void;
  type: 'inner' | 'outer';
}

const DateItem: React.FC<DateItemProps> = ({ onDateChange, type }) => {
  const [date, setDate] = useState<DateType | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const minDate =
    type === 'outer' ? dayjs().startOf('day').toDate() : undefined;

  const handleDateChange = (selectedDate: DateType) => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(formattedDate);
    }
    // setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#5cb874',
          borderRadius: 8,
        }}
      >
        <Ionicons name="calendar" size={20} color="#0f172a" />
        {type === 'outer' ? (
          <Text className="text-background ml-2 font-semibold">
            Pilih Tanggal Izin
          </Text>
        ) : (
          <Text className="text-background ml-2 font-semibold">
            {date ? `${dayjs(date).format('DD MMM YYYY')}` : 'Pilih Tanggal'}
          </Text>
        )}
      </TouchableOpacity>
      {type === 'outer' ? (
        <Text className="mt-3 text-accentYellow">
          {date
            ? `Tanggal Terpilih: ${dayjs(date).format('DD MMM YYYY')}`
            : 'Belum ada tanggal yang terpilih'}
        </Text>
      ) : (
        ''
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  marginHorizontal: 20,
                  padding: 20,
                  backgroundColor: '#94a3b8',
                  borderRadius: 10,
                }}
              >
                <DateTimePicker
                  mode="single"
                  date={date}
                  onChange={(params) => handleDateChange(params.date)}
                  minDate={minDate}
                />

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: '#ffcc00',
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#0f172a', fontWeight: 'bold' }}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DateItem;
