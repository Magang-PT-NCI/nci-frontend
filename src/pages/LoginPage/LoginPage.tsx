import React, { useEffect, useState } from "react";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import LoginImage from "../../../assets/image/dev_app_illustration";
import { SafeAreaView } from "react-native-safe-area-context";
import FormLogin from "./FormLogin";
import { useNavigation } from "@react-navigation/native";
import { LoginReqBody } from "../../interfaces/api-request";
import ApiRequest from "../../utils/ApiRequest";
import { Endpoint } from "../../enums/api-enum";
import { LoginResdata } from "../../interfaces/api-response";
import { setCookie } from "../../utils/setCookie";
import { ApiError } from "../../interfaces/api-error";

const LoginPage = () => {
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        Keyboard.dismiss();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleFormSubmit = async (data: LoginReqBody) => {
    const loginSuccess = (data: LoginResdata) => {
      setCookie("token", data.token);

      const profile_photo = data.profile_photo;
      const NIK = data.nik;
      if (data.user_role === "OnSite") {

        navigation.replace("OnsiteMain", { profile_photo, NIK });
      } else {
        navigation.replace("CoordinatorMain", { profile_photo, NIK });
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
            <LoginImage width={240} height={240} />
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
