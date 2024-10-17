import { View, Text } from "react-native";
import React, {useEffect, useState} from "react";
import ReportTableRow from "./ReportTableRow";
import { ScrollView } from "react-native-gesture-handler";
import {getCookie} from "../../utils/getCookie";
import ApiRequest from "../../utils/ApiRequest";
import {ParamsReq} from "../../interfaces/api-request";
import {DashboardResData} from "../../interfaces/dashboard.dto";
import {Endpoint} from "../../enums/api-enum";
import {ReportResData} from "../../interfaces/report.dto";

const ReportTable = () => {
  const [reportData, setReportData] = useState([] as ReportResData[]);

  const getReport = async () => {
    const token = (await getCookie("token")) || "";
    const response = await new ApiRequest<ParamsReq, ReportResData[]>(
        Endpoint.Monitoring
    )
      .setToken(token)
      .setPathParam("report")
      .setParams({ from: "2024-10-03" })
      .get();

    setReportData(response.getData());

    // console.log(JSON.stringify(response.getData(), null, 2));

  };

  useEffect(() => {
    getReport();
  }, []);


  return (
    <ScrollView
        className=''
      horizontal={true}
      contentContainerStyle={{ flexDirection: "row", flexGrow: 1 }}
    >
      <View className="w-full h-fit ">
        <View className="w-full flex flex-row border-b border-accentGreen justify-between items-center py-2">
          <View className="w-8 ">
            <Text className="text-accentYellow font-bold">No</Text>
          </View>
          <View className="w-36 ">
            <Text className="text-accentYellow font-bold text-center">NIK</Text>
          </View>
          <View className="w-40 ">
            <Text className="text-accentYellow font-bold text-center">
              Nama
            </Text>
          </View>
          <View className="w-28 ">
            <Text className="text-accentYellow font-bold text-center">
              Tanggal
            </Text>
          </View>
          <View className="w-36 ">
            <Text className="text-accentYellow font-bold text-center">Jam Kerja</Text>
          </View>
          <View className="w-20 ">
            <Text className="text-accentYellow font-bold text-center">
              Status
            </Text>
          </View>
        </View>

        {reportData.map((onsite, index) => (
          <ReportTableRow
            key={index}
            number={(index + 1).toString()}
            nik={onsite.nik}
            name={onsite.name}
            date={onsite.date}
            working_hours={onsite.working_hours}
            status={onsite.status}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ReportTable;
