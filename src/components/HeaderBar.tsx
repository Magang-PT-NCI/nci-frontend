import { View, Text, Image } from 'react-native'
import React from 'react'
import NotifBellIcon from '../../assets/icons/notificationsIcon'

const HeaderBar = () => {
  return (
    <View className='w-full  bg-background border-b border-b-accentGreen flex flex-row justify-between items-center py-3 px-4'>
      <View className='flex flex-row justify-center items-center gap-2'>
        <Image 
        source={{uri:'https://media.licdn.com/dms/image/v2/C560BAQFILYYv97IvhQ/company-logo_200_200/company-logo_200_200/0/1630645192893?e=2147483647&v=beta&t=LLeV0gvzIJcOq1ap_efrUFmmr_3l72HKDUrqR1E8SMg'}} 
        className='w-9 h-9 rounded'/>

        <Text className='font-bold text-accentGreen'>PT Nuansa Cerah Informasi</Text>
      </View>
      
      <View className='flex flex-row justify-center items-center gap-4'>
        <NotifBellIcon height={34} width={34}/>
        <Image 
        source={{uri:'https://img.freepik.com/premium-photo/young-handsome-man-isolated-blue-background-showing-ok-sign-with-fingers_758367-217200.jpg?ga=GA1.2.1941518686.1721033203&semt=ais_hybrid'}}  
        className='w-9 h-9 rounded-lg'/>
      </View>

    </View>
  )
}

export default HeaderBar