import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import FirstPage from './src/a'
import SecondPage from './src/b'
import ThirdPage from './src/e'

const Root = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="FirstPage" component={FirstPage} />
        <Root.Screen name="SecondPage" component={SecondPage} />
        <Root.Screen name="ThirdPage" component={ThirdPage} />
      </Root.Navigator>
    </NavigationContainer>
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