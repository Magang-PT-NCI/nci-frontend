import { View } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface DropdownCustomProps {
  placeholder?: string;
  marginT?: number;
  data: { label: string; value: string }[]; 
  onValueChange: (value: string) => void; 
}

const DropdownCustom: React.FC<DropdownCustomProps> = ({ placeholder = 'Select item', marginT = 0, data, onValueChange }) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <View className='w-full'>
      <Dropdown
        style={{
          marginTop: marginT,
          height: 50,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data} 
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={item => {
          setValue(item.value);
          onValueChange(item.value); 
        }}
      />
    </View>
  );
};

export default DropdownCustom;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#5cb874',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
