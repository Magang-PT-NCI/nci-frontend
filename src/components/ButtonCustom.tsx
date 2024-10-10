import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ButtonCustomProps {
  title: string;
  callbackEvt: () => void;
  color?: string;
  textColor?: string;
  borderColor?: string;
  mt?: number;
  disabled?: boolean;
  // padding?: number;
  textSize?: number;
  lineHeight?: number;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  title,
  callbackEvt,
  color = "#5cb874",
  mt = 0,
  disabled = false,
  borderColor = "#0f172a",
  textColor = "#0f172a",
  // padding=20,
  textSize = 14,
  lineHeight = 16,
}) => {
  return (
    <View className="w-full" style={{ marginTop: mt }}>
      <TouchableOpacity
        style={{
          backgroundColor: disabled ? "#5cb874" : color,
          opacity: disabled ? 0.4 : 1,
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: "center",
          borderColor: borderColor,
          borderWidth: 1,
          // padding: padding,
        }}
        onPress={callbackEvt}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
        <Text
          className="text-xs text-center font-bold"
          style={{
            color: textColor,
            fontSize: textSize,
            lineHeight: lineHeight,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCustom;
