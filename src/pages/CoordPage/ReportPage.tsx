import { View } from "react-native";
import React, { useState } from "react";
import ReportTable from "../../components/Table/ReportTable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReportTableFilter from "../../components/Table/ReportTableFilter";

const ReportPage = () => {

    const [keyword, setKeyword] = useState<string>("");
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const handleKeywordChange = (newKeyword: string) => {
        setKeyword(newKeyword);
    }
    const handleStartDateChange = (newStartDate: string | null) => {
        setStartDate(newStartDate);
    }
    const handleEndDateChange = (newEndDate: string | null) => {
        setEndDate(newEndDate);
    }

    return (
        <View className="w-full h-full flex justify-center items-center bg-background p-4">
            {/* Pass the state update functions as props */}
            <ReportTableFilter
                onKeywordChange={handleKeywordChange}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ReportTable />
            </GestureHandlerRootView>
        </View>
    );
};

export default ReportPage;
