import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { Endpoint } from "../../enums/api-enum";
import ApiRequest from "../../utils/ApiRequest";
import { getCookie } from "../../utils/getCookie";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../utils/StackParamList";
import {ValidateTokenReqBody, ValidateTokenResData} from "../../interfaces/auth.dto";

type SplashProps = NativeStackScreenProps<StackParamList, "Splash">;

const Splash: React.FC<SplashProps> = ({ navigation }) => {
  const validateToken = async () => {
    const token = await getCookie("token");

    if (token) {
      await new ApiRequest<ValidateTokenReqBody, ValidateTokenResData>(
          Endpoint.ValidateToken
      )
          .setReqBody({token: token})
          .post(
              (data) => {
                  const profile_photo = data.profile_photo;
                  const NIK = data.nik;
                  if (data.user_role === "OnSite") {

                      navigation.replace("OnsiteMain", {profile_photo, NIK});
                  } else {
                      navigation.replace("CoordinatorMain", {profile_photo, NIK});
                  }
              },
              (error) => navigation.replace("LoginPage")
          );
    } else {
      navigation.replace("LoginPage");
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <View className="w-full h-full bg-background flex justify-center items-center">
      <Image
        source={{
          uri: "https://media.licdn.com/dms/image/v2/C560BAQFILYYv97IvhQ/company-logo_200_200/company-logo_200_200/0/1630645192893?e=2147483647&v=beta&t=LLeV0gvzIJcOq1ap_efrUFmmr_3l72HKDUrqR1E8SMg",
        }}
        className="w-28 h-28 rounded-lg"
      />
      <View className="flex justify-between">
        <View className="flex justify-center items-center">
          <Text className="text-accentYellow text-3xl font-bold mt-5">
            Absensi OnSite
          </Text>
        </View>
        <Text
          className="text-textDefault font-bold text-center mt-3"
          style={{ fontSize: 9 }}
        >
          © 2024 Nuansa Cerah Informasi - All Rights Reserved.
        </Text>
      </View>
    </View>
  );
};

export default Splash;
