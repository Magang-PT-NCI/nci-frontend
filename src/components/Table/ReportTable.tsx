import { View, Text } from 'react-native'
import React from 'react'
import ReportTableRow from './ReportTableRow'
import { ScrollView } from 'react-native-gesture-handler'


const data = [
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Hadir"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Izin"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Absen"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Hadir"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Izin"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Absen"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Hadir"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Izin"},
  {nik: '001230045600700', name: "John Doe", date: "2024-09-24", status: "Absen"},
]

const ReportTable = () => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row' }}>

      <View className='w-full '>
        <View className='w-full flex flex-row border-b border-accentGreen justify-between items-center py-2'>
          <View className='w-8 '><Text className='text-accentYellow font-bold'>No</Text></View>
          <View className='w-36 '><Text className='text-accentYellow font-bold text-center'>NIK</Text></View>
          <View className='w-40 '><Text className='text-accentYellow font-bold text-center'>Nama</Text></View>
          <View className='w-28 '><Text className='text-accentYellow font-bold text-center'>Tanggal</Text></View>
          <View className='w-20 '><Text className='text-accentYellow font-bold text-center'>Status</Text></View>
        </View>

        {
          data.map((item, index) => (
            <ReportTableRow
            key={index}
            number={(index+1).toString()}
            nik={item.nik}
            name={item.name}
            date={item.date}
            status={item.status}
            />

          ))
        }
        
        
      </View>
    </ScrollView>
  )
}

export default ReportTable