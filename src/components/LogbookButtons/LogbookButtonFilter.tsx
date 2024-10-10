import { View } from "react-native";
import React, { useState } from "react";
import ButtonCustom from "../ButtonCustom";

interface LogbookButtonFilterProps {
  onFilter: (filter: string) => void;
}

const LogbookButtonFilter: React.FC<LogbookButtonFilterProps> = ({
  onFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    onFilter(filter);
  };

  const getButtonColors = (filter: string) => {
    const isSelected = filter === selectedFilter;
    return {
      color: isSelected ? "#5cb874" : "#0f172a",
      textColor: isSelected ? "#0f172a" : "#5cb874",
    };
  };

  return (
    <View className="w-full flex flex-row items-center">
      {["all", "progress", "done"].map((filter) => {
        const { color, textColor } = getButtonColors(filter);
        return (
          <View key={filter} className="w-28 mr-2">
            <ButtonCustom
              title={filter.charAt(0).toUpperCase() + filter.slice(1)}
              callbackEvt={() => handleFilterClick(filter)}
              color={color}
              textColor={textColor}
              borderColor="#5cb874"
            />
          </View>
        );
      })}
    </View>
  );
};

export default LogbookButtonFilter;
