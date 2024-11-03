import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ReportTable from '../../components/Table/ReportTable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReportTableFilter from '../../components/Table/ReportTableFilter';

import { ReportResData } from 'src/interfaces/report.dto';
import { ParamsReq } from 'src/interfaces/api-request';
import ApiRequest from 'src/utils/ApiRequest';
import { getCookie } from 'src/utils/getCookie';
import { Endpoint } from 'src/enums/endpoint-class';
import { useIsFocused } from '@react-navigation/native';
import PrintReport from '../../components/PrintReport';

const ReportPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reportData, setReportData] = useState<ReportResData[]>([]);
  const isFocused = useIsFocused();

  const handleKeywordChange = (newKeyword: string) => {
    setKeyword(newKeyword);
  };
  const handleStartDateChange = (newStartDate: string | null) => {
    setStartDate(newStartDate || '');
  };
  const handleEndDateChange = (newEndDate: string | null) => {
    setEndDate(newEndDate || '');
  };

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
    <View className="w-full h-full flex justify-center items-center bg-background p-4">
      {/* Pass the state update functions as props */}
      <ReportTableFilter
        onKeywordChange={handleKeywordChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      <View className="w-full">
        <PrintReport report={reportData} />
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReportTable report={reportData} />
      </GestureHandlerRootView>
    </View>
  );
};

export default ReportPage;
