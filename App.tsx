import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CoordinatorMain,
  LoginPage,
  OnsiteDetailPage,
  OnsiteMain,
  Splash,
} from "./src/pages";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0f172a" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="OnsiteMain" component={OnsiteMain} />
          <Stack.Screen name="CoordinatorMain" component={CoordinatorMain} />
          <Stack.Screen name="OnsiteDetailPage" component={OnsiteDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
