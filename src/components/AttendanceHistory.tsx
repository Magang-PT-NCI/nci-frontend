import { View, Text } from 'react-native'
import React from 'react'
import CheckInIcon from '../../assets/icons/checkinIcon'
import CheckOutIcon from '../../assets/icons/checkoutIcon'


const AttendanceHistory = () => {
  return (
    <View className='w-full p-3 rounded-lg mt-5'>
      <View className='w-3/4 flex gap-3 '>  
      <Text className='font-bold text-lg text-accentYellow'>Riwayat Absensi</Text>

        <View className='flex flex-row gap-1 w-full justify-between items-center'>
        <CheckInIcon height={40} width={40}/>
          <Text className='text-textDefault w-1/2'>Check In</Text> 
          <Text className='text-textDefault'>07:00</Text>
        </View>
        <View className='flex flex-row gap-1 w-full justify-between items-center'>
        <CheckOutIcon height={40} width={40}/>
          <Text className='text-textDefault w-1/2'>Check Out</Text> 
          <Text className='text-textDefault'>07:00</Text>
        </View> 
        
      </View>
    </View>
  )
}

export default AttendanceHistory