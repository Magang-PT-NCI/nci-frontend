import { View, Text } from 'react-native'
import React from 'react'


interface LogbookCardProps {
  timeStart: string;
  timeEnd: string;
  desc: string;
  status: string;
}

const LogbookCard: React.FC<LogbookCardProps> = ({timeStart, timeEnd, desc, status}) => {
  return (
    <View className='w-full p-5 pb-4 border border-accentGreen rounded-lg mt-4'>
      <View className='flex flex-row justify-between'>
      <Text className=' bg-accentYellow rounded px-2 py-1 text-background font-bold'>{timeStart} - {timeEnd}</Text>
      <Text className={`${status==='done'? 'bg-green-600' : 'bg-blue-500'} text-center rounded px-3 py-1 text-background font-bold `}>{status}</Text>
      </View>
      <Text className='text-textDefault text-sm mt-5 text-justify '>{desc}</Text>
    </View>
  )
}

export default LogbookCard


