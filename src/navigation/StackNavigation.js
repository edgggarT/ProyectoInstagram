import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomNavigation from "./BottomNavigation";
import ChangeNameScreen from "../screens/user/ChangeNameScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
        />
        <Stack.Screen
          name="ChangeNameScreen"
          component={ChangeNameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
