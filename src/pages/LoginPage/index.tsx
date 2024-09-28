import React, { useEffect, useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import LoginImage from '../../../assets/image/dev_app_illustration';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormLogin from './FormLogin';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [formData, setFormData] = useState({ nik: '', password: '' });
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss(); 
    });

    return () => {
      keyboardDidHideListener.remove(); 
    };
  }, []);

  const handleFormSubmit = (data: { nik: string; password: string }) => {
    setFormData(data);
    console.log('Form Data:', data);
    navigation.replace('OnsiteMain')
    // navigation.replace('CoordinatorMain')
    
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className='w-full h-full bg-accentGreen flex justify-between items-center'>
          <SafeAreaView className='py-20'>
            <LoginImage width={240} height={240} />
          </SafeAreaView>
          
          <FormLogin onFormSubmit={handleFormSubmit} />

        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
