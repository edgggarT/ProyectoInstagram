import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../screens/Login'
import Register from '../screens/Register';
import Dashboard from '../screens/dashboard/Dashboard';
import ForgotPassword from '../screens/ForgotPassword';
import ChangeNameScreen from "../screens/user/ChangeNameScreen";
import BottomNavigation from "./BottomNavigation";

const Stack = createNativeStackNavigator();

function AuthNavigation() {

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="Dashboard" component={BottomNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTitle: 'Restablecer contraseña'}}/>
            <Stack.Screen name="ChangeName" component={ChangeNameScreen} options={{headerTitle: 'Configurar'}}/>
        </Stack.Navigator>
    )
}

export default AuthNavigation;