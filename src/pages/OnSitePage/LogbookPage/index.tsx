import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import LogbookCard from '../../../components/LogbookCard'
import LogbookButtons from '../../../components/LogbookButtons/LogbookButtons';

const data = [
  { timeStart: '08:00', timeEnd: '08:35', status: 'done', desc: 'Completed task A.' },
  { timeStart: '09:00', timeEnd: '09:45', status: 'progress', desc: 'Working on task B.' },
  { timeStart: '10:00', timeEnd: '10:30', status: 'done', desc: 'Completed task C.' },
  { timeStart: '11:00', timeEnd: '11:40', status: 'done', desc: 'Finished meeting with client.' },
  { timeStart: '12:00', timeEnd: '12:30', status: 'progress', desc: 'Working on report D.' },
  { timeStart: '13:00', timeEnd: '13:20', status: 'done', desc: 'Finished task E.' },
  { timeStart: '14:00', timeEnd: '14:50', status: 'progress', desc: 'Handling project F.' },
  { timeStart: '15:00', timeEnd: '15:35', status: 'done', desc: 'Completed task G.' },
  { timeStart: '16:00', timeEnd: '16:20', status: 'progress', desc: 'Working on documentation H.' },
  { timeStart: '17:00', timeEnd: '17:45', status: 'done', desc: 'Finalizing task I.' },
  { timeStart: '18:00', timeEnd: '18:25', status: 'progress', desc: 'Meeting preparation.' },
  { timeStart: '19:00', timeEnd: '19:50', status: 'done', desc: 'Completed task J.' }
];

const LogbookPage = () => {
  return (
    <View className='w-full h-full flex bg-background p-4'>
      <LogbookButtons/>
      <ScrollView style={{showsVerticalScrollIndicator: false}}>
        {data.map((item, index) => (
          <LogbookCard
            key={index}
            timeStart={item.timeStart}
            timeEnd={item.timeEnd}
            status={item.status}
            desc={item.desc}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default LogbookPage
