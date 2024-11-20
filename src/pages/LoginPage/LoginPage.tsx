import React, { useEffect, useState } from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormLogin from './FormLogin';
import { StackActions, useNavigation } from '@react-navigation/native';
import ApiRequest from '../../utils/ApiRequest';
import { Endpoint } from '../../enums/endpoint-class';
import { setCookie } from '../../utils/setCookie';
import { ApiError } from '../../interfaces/api-error';
import { LoginReqBody, LoginResdata } from '../../interfaces/auth.dto';

const LoginPage = () => {
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Keyboard.dismiss();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleFormSubmit = async (data: LoginReqBody) => {
    const loginSuccess = (data: LoginResdata) => {
      setCookie('token', data.token);
      setCookie('NIK', data.nik);

      const profile_photo = data.profile_photo;
      const NIK = data.nik;
      if (data.user_role === 'OnSite') {
        navigation.dispatch(
          StackActions.replace('OnsiteMain', { profile_photo, NIK }),
        );
      } else {
        navigation.dispatch(
          StackActions.replace('CoordinatorMain', { profile_photo, NIK }),
        );
      }
    };

    const loginError = (error: ApiError) => {
      setAlertMessage(error.message);
    };

    await new ApiRequest<LoginReqBody, LoginResdata>(Endpoint.Login)
      .setReqBody(data)
      .post(loginSuccess, loginError);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full h-full bg-accentGreen flex justify-between items-center">
          <SafeAreaView className="py-20">
            <Image
              source={require('../../../assets/logo.png')}
              style={{ width: 180, height: 180 }}
            />
          </SafeAreaView>

          <FormLogin
            onFormSubmit={handleFormSubmit}
            alertMessage={alertMessage}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
