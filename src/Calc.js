
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomFabBar } from 'rn-wave-bottom-bar'
import { NavigationContainer } from '@react-navigation/native'
import CalcDetail from './CalcDetail'
import History from './History'
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();

function MyTabs({ navigation }) {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <Tab.Navigator
            initialRouteName="Settings"
            // tabBar={(props) => <BottomFabBar activeTintColor='#4cc9f0' inactiveTintColor='#cecece' color="#f3f3f3" {...props} />}
        >
            <Tab.Screen
                name="CalcDetail"
                options={{
                    tabBarLabel: 'CalcDetail',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="apps-sharp" color={color} size={size} />
                    ),
                }}
                component={CalcDetail}
            />
            <Tab.Screen 
            name="History" 
            options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="analytics" color={color} size={size} />
                ),
            }}
            component={History} />
        </Tab.Navigator>
    );
}

export default MyTabs