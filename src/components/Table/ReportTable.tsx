import { View, Text } from 'react-native';
import React from 'react';
import ReportTableRow from './ReportTableRow';
import { ScrollView } from 'react-native-gesture-handler';
import { ReportResData } from '../../interfaces/report.dto';

interface ReportTableProps {
  report: ReportResData[];
}

const ReportTable: React.FC<ReportTableProps> = ({ report }) => {
  return (
    <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexDirection: 'row', flexGrow: 1 }}
      >
        <View className="w-full h-fit">
          <View className="w-full flex flex-row border-b border-accentGreen justify-between items-center py-2">
            <View className="w-8">
              <Text className="text-accentYellow font-bold">No</Text>
            </View>
            <View className="w-36">
              <Text className="text-accentYellow font-bold text-center">
                NIK
              </Text>
            </View>
            <View className="w-40">
              <Text className="text-accentYellow font-bold text-center">
                Nama
              </Text>
            </View>
            <View className="w-28">
              <Text className="text-accentYellow font-bold text-center">
                Tanggal
              </Text>
            </View>
            <View className="w-36">
              <Text className="text-accentYellow font-bold text-center">
                Jam Kerja
              </Text>
            </View>
            <View className="w-20">
              <Text className="text-accentYellow font-bold text-center">
                Status
              </Text>
            </View>
          </View>

          {report.map((onsite, index) => {
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
    </ScrollView>
  );
};

export default ReportTable;
