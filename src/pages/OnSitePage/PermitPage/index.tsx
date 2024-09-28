import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import DropdownCustom from '../../../components/DropdownCustom';
import ButtonCustom from '../../../components/ButtonCustom';
import CheckBox from 'expo-checkbox';
import DateItem from '../../../components/DateItem';
import customConfirmDialogue from '../../../utils/customConfirmDialogue'

const PermitPage = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); 
  const [selectedDays, setSelectedDays] = useState<string | null>(null); 
  const [selectedReason, setSelectedReason] = useState<string | null>(null); 

  const data_hari_izin = [{ label: '1 Hari', value: '1' }, { label: '2 Hari', value: '2' }, { label: '3 Hari', value: '3' }]
  const data_alasan_izin = [{ label: 'Sakit', value: 'sick' },{ label: 'Keperluan Mendadak', value: 'urgent_reason' }, { label: 'Lainnya', value: 'other' }]

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log('Tanggal terpilih:', date);
  };

  const handleDaysChange = (value: string) => {
    setSelectedDays(value);
    console.log('Jumlah Hari Izin:', value);
  };

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    console.log('Alasan Izin:', value);
  };

  const isFormComplete = selectedDate !== null && selectedDays !== null && selectedReason !== null;

  const handleSubmit = () => {
    customConfirmDialogue("Konfirmasi Pengajuan Izin", "Apakah Anda yakin akan mengirim pengajuan?");
  };

  return (
    <View className='w-full flex flex-col p-4'>
      
      <DateItem onDateChange={handleDateChange} type='outer'/>

      <DropdownCustom 
        placeholder='Jumlah Hari Izin' 
        marginT={20} 
        data={data_hari_izin} 
        onValueChange={handleDaysChange} 
      />
      
      <DropdownCustom 
        placeholder='Alasan Izin' 
        marginT={20} 
        data={data_alasan_izin} 
        onValueChange={handleReasonChange} 
      />

      <View className='w-full flex flex-row items-center mt-8 ml-4'>
        <CheckBox 
          className='w-5 h-5' 
          value={toggleCheckBox} 
          onValueChange={setToggleCheckBox} 
          color={isFormComplete ? '#5cb874' : 'gray'} 
          disabled={!isFormComplete} 
        />
        <Text className='text-textDefault ml-4'>
          Pastikan data sudah benar. Anda tidak dapat MENGUBAH atau MEMBATALKAN pengajuan.
        </Text>
      </View>

      <ButtonCustom 
        title='Kirim' 
        callbackEvt={handleSubmit} 
        mt={20} 
        disabled={!toggleCheckBox} 
      />
    </View>
  );
};

export default PermitPage;
