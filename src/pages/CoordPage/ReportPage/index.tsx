import { View, Text } from 'react-native'
import React from 'react'
import ReportTable from '../../../components/Table/ReportTable'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ReportTableFilter from '../../../components/Table/ReportTableFilter'

const ReportPage = () => {
  return (
    <View className='w-full h-full flex justify-center items-center bg-background p-4'>
      <ReportTableFilter/>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReportTable/>
      </GestureHandlerRootView>
    </View>
  )
}

export default ReportPage