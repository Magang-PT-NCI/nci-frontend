import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import LogbookCard from "../../components/LogbookCard";
import LogbookButtonFilter from "../../components/LogbookButtons/LogbookButtonFilter";
import LogbookButtonCreate from "../../components/LogbookButtons/LogbookButtonCreate";
import { LogbookResData } from "../../interfaces/api-response";

interface LogbookPageProps {
  logbookData: Logbook[];
  attendanceID: number;
}

const LogbookPage: React.FC<LogbookPageProps> = ({
  logbookData,
  attendanceID,
}) => {
  const [logbook, setLogbook] = useState<Logbook[]>([]);
  const [filteredData, setFilteredData] = useState<Logbook[]>([]);

  const filterLogbookData = (filter: string) => {
    if (filter === "all") {
      setFilteredData(logbook);
    } else {
      setFilteredData(logbook.filter((item) => item.status === filter));
    }
  };

  const handleSubmit = (newLogbook: LogbookResData) => {
    setLogbook((prevLogbookData: Logbook[]) => {
      return [...prevLogbookData, newLogbook];
    });
  };

  useEffect(() => {
    filterLogbookData("all");
  }, [logbook]);

  useEffect(() => {
    setLogbook(logbookData);
  }, [logbookData]);

  return (
    <View className="w-full h-full flex bg-background p-4">
      <View className="w-full pb-4">
        <LogbookButtonFilter onFilter={filterLogbookData} />
        <LogbookButtonCreate
          attendanceID={attendanceID}
          onSubmit={handleSubmit}
        />
      </View>

      <ScrollView style={{ showsVerticalScrollIndicator: false }}>
        {filteredData?.map((item, index) => (
          <LogbookCard
            key={index}
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
