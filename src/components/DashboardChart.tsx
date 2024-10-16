import {View} from "react-native";
import React from "react";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryZoomContainer} from "victory-native";
import {WeeklySummary} from "../interfaces/dashboard.dto";

interface DashboardChartProps {
  chartData: WeeklySummary;
}

const DashboardChart: React.FC<DashboardChartProps> = ({chartData}) => {
  // console.log(JSON.stringify(chartData, null, 2));

  const formattedData = chartData
      ? Object.keys(chartData).map((key) => ({
        x: key.charAt(0).toUpperCase() + key.slice(1),
        presence: chartData[key].presence,
        permit: chartData[key].permit,
        absent: chartData[key].absent,
      }))
      : [];


  return (
      <View className="border border-accentGreen w-full p-2 bg-background flex justify-center items-center rounded-lg">
        <VictoryChart>
          {/* Legend untuk menjelaskan setiap jenis data */}
          <VictoryLegend
              x={125}
              y={10}
              orientation="horizontal"
              gutter={20}
              data={[
                { name: 'Hadir', symbol: { fill: 'green' } },
                { name: 'Izin', symbol: { fill: 'orange' } },
                { name: 'Absen', symbol: { fill: 'red' } },
              ]}
              style={{ labels: { fill: '#94a3b8' } }}
          />

          {/* Grup bar untuk Presence, Permit, dan Absent */}
          <VictoryGroup offset={12} colorScale={['green', 'orange', 'red']}>
            <VictoryBar data={formattedData} x="x" y="presence" />
            <VictoryBar data={formattedData} x="x" y="permit" />
            <VictoryBar data={formattedData} x="x" y="absent" />
          </VictoryGroup>

          {/* Sumbu X (Hari Senin - Sabtu) */}
          <VictoryAxis
              tickValues={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
              tickFormat={(t) => {
                const dayMapping = {
                  Monday: 'Senin',
                  Tuesday: 'Selasa',
                  Wednesday: 'Rabu',
                  Thursday: 'Kamis',
                  Friday: 'Jumat',
                  Saturday: 'Sabtu',
                };
                return dayMapping[t] || t; // Mengembalikan label yang sesuai
              }}
              style={{
                tickLabels: { fill: '#94a3b8' }, // Warna teks pada sumbu X
                axisLabel: { fill: '#94a3b8' },  // Warna label sumbu
              }}
          />

          {/* Sumbu Y (Nilai Presence, Permit, Absent) */}
            <VictoryAxis
                dependentAxis
                tickFormat={(x) => `${x}`}
                domain={[0, 14]} // Sesuaikan angka 10 dengan skala yang sesuai untuk data Anda
                style={{
                    tickLabels: { fill: '#94a3b8' },
                    axisLabel: { fill: '#94a3b8' },
                }}
            />

        </VictoryChart>
      </View>
  );
};

export default DashboardChart;
