import  {View, Text, Image} from 'react-native'
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/dashboard/Dashboard";
import Search from "../screens/dashboard/Search";
import Chat from '../screens/dashboard/Chat';
import Reel from '../screens/dashboard/Reel';
import UserProfile from '../screens/dashboard/UserProfile';

const Tab = createBottomTabNavigator()
const BottomNavigation = () => {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }} >
            <Tab.Screen 
                name="Home" 
                component={Dashboard} 
                options={{
                    tabBarIcon: () => (
                        <Image 
                            style={{height: 24, width: 24}}
                            source={
                                require('./../../assets/inicio.jpg')
                            }      
                        />
                    )
                }}

            />
            <Tab.Screen name="Reel" component={Reel}
                options={{
                    tabBarIcon: ({focused})=>(
                        <Image
                            style={{height:24, width:24}} 
                            source={
                                 focused 
                                    ? require('./../../assets/reproducir.jpg')
                                    : require('./../../assets/reproducir.jpg')
                            } 
                        />
                    ),
                }} 
            />
            <Tab.Screen name="Chat" component={Chat}
                options={{
                    tabBarIcon: ({focused})=>(
                        <Image
                            style={{height:24, width:26}} 
                            source={
                                 focused 
                                    ? require('./../../assets/mensajes.jpg')
                                    : require('./../../assets/mensajes.jpg')
                            } 
                        />
                    ),
                }} 
            />
            <Tab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon: ({focused})=>(
                        <Image
                            style={{height:24, width:24}} 
                            source={
                                 focused 
                                    ? require('./../../assets/lupa.jpg')
                                    : require('./../../assets/lupa.jpg')
                            } 
                        />
                    ),
                }} 
            />
            <Tab.Screen name="UserProfile" component={UserProfile}
                options={{
                    tabBarIcon: ({focused})=>(
                        <Image
                            style={{height:24, width:24}} 
                            source={
                                 focused 
                                    ? require('./../../assets/usuario.jpg')
                                    : require('./../../assets/usuario.jpg')
                            } 
                        />
                    ),
                }} 
            />
        



        </Tab.Navigator>
    )
}

export default BottomNavigation;