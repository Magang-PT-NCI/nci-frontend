import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import DashboardChart from '../../components/DashboardChart';
import TodaySummarySection from '../../components/TodaySummarySection';
import { getCookie } from '../../utils/getCookie';
import ApiRequest from '../../utils/ApiRequest';
import { ParamsReq } from '../../interfaces/api-request';
import { Endpoint } from '../../enums/endpoint-class';
import { DashboardResData } from '../../interfaces/dashboard.dto';

const DashboardPage = () => {
  const [monitoringDashboardData, setMonitoringDashboardData] = useState(
    {} as DashboardResData,
  );

  const getMonitoringDashboard = async () => {
    const token = (await getCookie('token')) || '';
    const response = await new ApiRequest<ParamsReq, DashboardResData>(
      Endpoint.Monitoring,
    )
      .setToken(token)
      .setPathParam('dashboard')
      .setParams({ filter: 'all' })
      .get();

    setMonitoringDashboardData(response.getData());
  };

  useEffect(() => {
    getMonitoringDashboard();
  }, []);

  return (
    <View className="w-full h-full flex items-center bg-background p-4">
      <View className="w-full flex flex-row mb-5 mt-3 justify-between">
        <Text className="font-bold text-lg text-accentYellow">Hari Ini </Text>
        <Text className="font-bold text-lg text-accentYellow">
          {monitoringDashboardData.date}
        </Text>
      </View>

      <TodaySummarySection
        presence={monitoringDashboardData.total_presence}
        permit={monitoringDashboardData.total_permit}
        absent={monitoringDashboardData.total_absent}
      />

      <Text className="font-bold text-lg text-accentYellow w-full mb-4">
        Kehadiran OnSite Minggu Ini
      </Text>

      <DashboardChart chartData={monitoringDashboardData.weekly_summary} />
    </View>
  );
};

export default DashboardPage;
