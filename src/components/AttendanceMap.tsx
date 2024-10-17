import React from "react";
import {View, StyleSheet, Text} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

interface AttendanceMapProps {
    status: string;
    latitude?: number;
    longitude?: number;
}

const AttendanceMap: React.FC<AttendanceMapProps> = ({status, latitude, longitude}) => {

    console.log(latitude);
    console.log(longitude);
    console.log(latitude && longitude ? "halo" : "hai");
    return (
        <View className={'w-full my-2'}>

            <Text className="font-bold text-lg text-accentYellow">
                {status}
            </Text>
            {latitude && longitude ?
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -6.200000, // Ganti dengan latitude awal
                            longitude: 106.816666, // Ganti dengan longitude awal
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: -6.200000, longitude: 106.816666 }}
                            title="Lokasi OnSite"
                            description={"Lokasi " + {status}}
                        />
                    </MapView>
                </View>
                 :
                <View className={'my-6'}>
                    <Ionicons
                        name="location-outline"

                        size={24}
                        color="gray"
                    />
                </View>
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default AttendanceMap;
