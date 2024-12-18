import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ButtonCustom from '../../components/ButtonCustom';
import AlertLogin from '../../components/AlertLogin';

interface FormLoginProps {
  onFormSubmit: (data: { nik: string; password: string }) => void;
  alertMessage?: string;
}

const FormLogin: React.FC<FormLoginProps> = ({
  onFormSubmit,
  alertMessage,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onFormSubmit({ nik, password });
  };

  useEffect(() => {}, []);

  return (
    <View
      className="bg-background  w-full p-8 pb-12"
      style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
    >
      {alertMessage && <AlertLogin message={alertMessage} />}

      <Text className="text-accentYellow text-2xl font-bold text-center">
        LOGIN
      </Text>

      <Text className="text-accentGreen font-semibold my-2">NIK</Text>
      <TextInput
        className="p-4 rounded-2xl bg-customGray border border-accentGreen mb-4 text-textDefault"
        placeholder="NIK"
        placeholderTextColor={'#94a3b8'}
        style={{ fontSize: 14 }}
        value={nik}
        onChangeText={setNik}
      />

      <Text className="text-accentGreen font-semibold mb-2">Password</Text>
      <View className="flex-row items-center p-4 rounded-2xl bg-customGray border border-accentGreen mb-4">
        <TextInput
          className="flex-1 text-textDefault"
          placeholder="Password"
          placeholderTextColor={'#94a3b8'}
          secureTextEntry={!passwordVisible}
          style={{ fontSize: 14 }}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <ButtonCustom
        title="Masuk"
        callbackEvt={handleLogin}
        color="#5cb874"
        mt={16}
      />
    </View>
  );
};

export default FormLogin;
