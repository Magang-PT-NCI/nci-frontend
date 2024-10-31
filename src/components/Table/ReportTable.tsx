import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ReportTableRow from './ReportTableRow';
import { ScrollView } from 'react-native-gesture-handler';
import { getCookie } from '../../utils/getCookie';
import ApiRequest from '../../utils/ApiRequest';
import { ParamsReq } from '../../interfaces/api-request';
import { DashboardResData } from '../../interfaces/dashboard.dto';
import { Endpoint } from '../../enums/endpoint-class';
import { ReportResData } from '../../interfaces/report.dto';
import dayjs from 'dayjs';
import { useIsFocused } from '@react-navigation/native';

interface ReportTableProps {
  keyword: string;
  startDate: string;
  endDate: string;
}

const ReportTable: React.FC<ReportTableProps> = ({
  keyword,
  startDate,
  endDate,
}) => {
  const [reportData, setReportData] = useState([] as ReportResData[]);
  const isFocused = useIsFocused();

  const getReport = async () => {
    const token = (await getCookie('token')) || '';
    const response = await new ApiRequest<ParamsReq, ReportResData[]>(
      Endpoint.Monitoring,
    )
      .setToken(token)
      .setPathParam('report')
      .setParams({ keyword: keyword, from: startDate, to: endDate })
      .get();

    const data = response.getData();
    console.log(data);

    if (data) {
      setReportData(response.getData());
    }
  };

  useEffect(() => {
    if (isFocused) getReport();
  }, [keyword, startDate, endDate, isFocused]);

  return (
    <ScrollView
      className=""
      horizontal={true}
      contentContainerStyle={{ flexDirection: 'row', flexGrow: 1 }}
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
            <Text className="text-accentYellow font-bold text-center">
              Jam Kerja
            </Text>
          </View>
          <View className="w-20 ">
            <Text className="text-accentYellow font-bold text-center">
              Status
            </Text>
          </View>
        </View>

        {reportData.map((onsite, index) => {
          const status = onsite.late ? 'Terlambat' : onsite.status;
          return (
            <ReportTableRow
              key={index}
              number={(index + 1).toString()}
              nik={onsite.nik}
              name={onsite.name}
              date={onsite.date}
              working_hours={onsite.working_hours}
              status={status}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ReportTable;
