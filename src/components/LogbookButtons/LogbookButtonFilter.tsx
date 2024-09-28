import { View, Text } from 'react-native'
import React from 'react'
import ButtonCustom from '../ButtonCustom'

const LogbookButtonFilter = () => {
  return (
    <View className='w-full flex flex-row items-center'>
      <View className='w-28 mr-2'>
        <ButtonCustom title='Semua' callbackEvt={()=>console.log('Semua')} color='#0f172a' textColor='#5cb874' borderColor='#5cb874'/>
      </View>
      <View className='w-28 mr-2'>
        <ButtonCustom title='Progres' callbackEvt={()=>console.log('Progres')} color='#0f172a' textColor='#5cb874' borderColor='#5cb874'/>
      </View>
      <View className='w-28 mr-2'>
        <ButtonCustom title='Done' callbackEvt={()=>console.log('Done')} color='#0f172a' textColor='#5cb874' borderColor='#5cb874'/>
      </View>
    </View>
  )
}

export default LogbookButtonFilter