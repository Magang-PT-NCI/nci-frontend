import { View, Text } from "react-native";
import React, {useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeInfo from "../../components/EmployeeInfo";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../../utils/StackParamList";
import {getCookie} from "../../utils/getCookie";
import ApiRequest from "../../utils/ApiRequest";
import {HeadersReq} from "../../interfaces/api-request";
import {EmployeeResData} from "../../interfaces/employee.dto";
import {Endpoint} from "../../enums/api-enum";

type OnsiteMainProps = NativeStackScreenProps<StackParamList, "OnsiteDetailPage">;

const OnSiteDetailPage: React.FC<OnsiteMainProps> = ({route}) => {
    const { dataRow } = route.params;
    const [onsiteData, setOnsiteData] = useState({} as EmployeeResData)

    const getOnsiteData = async () => {
        const token = await getCookie("token");
        if (token) {
            const res = await new ApiRequest<HeadersReq, EmployeeResData>(
                Endpoint.GetEmployee
            )
                .setToken(token)
                .setPathParam(dataRow.nik)
                .get();

            const data = res.getData();

            if (data) {
                setOnsiteData(data);
            }
        }
    };

    useEffect(() => {
        getOnsiteData();
    }, []);


  return (
    <SafeAreaView>
      <View className="w-full h-full flex bg-background p-4">
        <Text className="font-bold text-xl text-accentYellow text-left my-4">
          Detail Info OnSite
        </Text>
        <EmployeeInfo
          NIK={onsiteData.nik}
          name={onsiteData.name}
          area={onsiteData.area}
          role={onsiteData.role}
          date={dataRow.date}
          status={dataRow.status}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnSiteDetailPage;
