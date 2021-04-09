
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomFabBar } from 'rn-wave-bottom-bar'
import { NavigationContainer } from '@react-navigation/native'
import C from './c'
import D from './d'
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();

const b = ({ navigation, route }) => {
    return (
        // <NavigationContainer>
        <Tab.Navigator
            initialRouteName="C"
            tabBar={(props) => <BottomFabBar activeTintColor='#4cc9f0' inactiveTintColor='#cecece' color="#f3f3f3" {...props} />}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: 'C',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="C" color={color} size={size} />
                    ),
                }}
                name="C"
            > {() => <C />}
            </Tab.Screen>
            <Tab.Screen
                name="D"
                options={{
                    tabBarLabel: 'D',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="D" color={color} size={size} />
                    ),
                }}
            > {() => <D />}
            </Tab.Screen>
        </Tab.Navigator>
        // </NavigationContainer>
    )
}

function MyTabs({ navigation }) {
    const [mo, setMo] = useState([])
    
    const setUp = () => {
        AsyncStorage.setItem('MIMI', 'HEHE')
        let yuk = [0,9,7]
        AsyncStorage.setItem('ARR', JSON.stringify(yuk))
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            setUp()
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <Tab.Navigator
            initialRouteName="Settings"
            tabBar={(props) => <BottomFabBar activeTintColor='#4cc9f0' inactiveTintColor='#cecece' color="#f3f3f3" {...props} />}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="key" color={color} size={size} />
                    ),
                }}
                component={C}
            />
            <Tab.Screen name="Settings" component={D} />
        </Tab.Navigator>
    );
}

export default MyTabs