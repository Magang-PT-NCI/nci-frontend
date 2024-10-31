import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

interface AttendanceMapProps {
  status: string;
  latitude?: number;
  longitude?: number;
}

const AttendanceMap: React.FC<AttendanceMapProps> = ({
  status,
  latitude,
  longitude,
}) => {
  return (
    <View className="w-full my-2">
      <Text className="font-bold text-lg text-accentYellow mb-3">{status}</Text>
      {latitude && longitude ? (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude, longitude }}
              title="Lokasi OnSite"
              description={'Lokasi ' + { status }}
            />
          </MapView>
        </View>
      ) : (
        <View className={'my-6'}>
          <Ionicons name="location-outline" size={24} color="gray" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default AttendanceMap;
