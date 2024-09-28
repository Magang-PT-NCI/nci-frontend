import { View, Text } from 'react-native'
import React from 'react'
import DashboardChart from '../../../components/DashboardChart'
import TodaySummarySection from '../../../components/TodaySummarySection'
import dayjs from 'dayjs';

const DashboardPage = () => {
  return (
    <View className='w-full h-full flex items-center bg-background p-4'>
      <View className='w-full flex flex-row mb-5 mt-3 justify-between'>
      <Text className='font-bold text-lg text-accentYellow'>Hari Ini </Text>
      <Text className='font-bold text-lg text-accentYellow'>{dayjs().format('YYYY-MM-DD')}</Text>
      </View>
      <TodaySummarySection/>
      <Text className='font-bold text-lg text-accentYellow w-full mb-4'>Kehadiran OnSite Minggu Ini</Text>
      <DashboardChart/>
    </View>
  )
}

export default DashboardPage