import { View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import LogbookCard from '../../components/LogbookCard';
import LogbookButtonFilter from '../../components/LogbookButtons/LogbookButtonFilter';
import LogbookButtonCreate from '../../components/LogbookButtons/LogbookButtonCreate';
import { Logbook, LogbookResData } from '../../interfaces/logbook.dto';

interface LogbookPageProps {
  logbookData: Logbook[];
  attendanceID: number;
  getAttendance?: () => void;
  role?: 'onsite' | 'coord';
}

const LogbookPage: React.FC<LogbookPageProps> = ({
  logbookData,
  attendanceID,
  getAttendance,
  role,
}) => {
  const [logbook, setLogbook] = useState<Logbook[]>([]);
  const [filteredData, setFilteredData] = useState<Logbook[]>([]);
  const [filter, setFilter] = useState('all');
  const filterLogbookData = (filter: string) => {
    if (filter === 'all') {
      setFilteredData(logbook);
      console.log('ALL');
    } else {
      console.log(filter);
      setFilteredData(
        logbook.filter((item) => {
          console.log(item.status);
          console.log(filter);
          return item.status === filter;
        }),
      );
    }
  };

  const handleSubmit = (newLogbook: LogbookResData) => {
    setLogbook((prevLogbookData: Logbook[]) => {
      return [...prevLogbookData, newLogbook];
    });
  };

  useEffect(() => {
    filterLogbookData(filter);
  }, [logbook]);

  useEffect(() => {
    setLogbook(logbookData || []);
  }, [logbookData]);

  // console.log(JSON.stringify(filteredData, null, 2));

  return (
    <View className="w-full h-full flex bg-background p-4">
      <View className="w-full pb-4">
        <LogbookButtonFilter
          onFilter={(filter) => {
            setFilter(filter);
            filterLogbookData(filter);
          }}
        />
        {role === 'onsite' ? (
          <LogbookButtonCreate
            attendanceID={attendanceID}
            onSubmit={handleSubmit}
          />
        ) : (
          ''
        )}
      </View>

      {/*@ts-ignore*/}
      <ScrollView style={{ showsVerticalScrollIndicator: false }}>
        {filteredData?.map((item, index) => (
          <LogbookCard
            role={role}
            getAttendance={getAttendance}
            key={index}
            id={item.id}
            timeStart={item.start_time}
            timeEnd={item.end_time}
            status={item.status}
            desc={item.description}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default LogbookPage;
