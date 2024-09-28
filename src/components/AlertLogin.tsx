import { View, Text } from 'react-native'
import React from 'react'
import FailIcon from '../../assets/icons/errorIcon'

interface AlertLoginProps {
  title: string;
  message: string;
}

const AlertLogin: React.FC<AlertLoginProps> = ({title, message}) => {
  return (
    <View className='w-full bg-red-400 rounded-xl p-3 px-5 border border-red-500 flex flex-row items-center justify-center'>
      <FailIcon width={30} height={30}/>
      <View className='ml-2'>
        <Text className=' font-semibold text-red-800'>{title}</Text>
        <Text className='text-xs italic text-red-800'>{message}</Text>
      </View>
    </View>
  )
}

export default AlertLogin