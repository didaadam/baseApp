import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/Home'
import Calc from './src/Calc'
import { MenuProvider } from 'react-native-popup-menu';

const Root = createStackNavigator()

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Root.Navigator screenOptions={{
          headerShown: false
        }}>
          <Root.Screen name="Home" component={Home} />
          <Root.Screen name="Calc" component={Calc} />
        </Root.Navigator>
      </NavigationContainer>
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
})