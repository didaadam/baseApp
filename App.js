import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import FirstPage from './src/a'
import SecondPage from './src/b'

const Root = createStackNavigator()

const Screen1 = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Screen 1</Text>
    <Button
      title="Go to Screen 2"
      onPress={() => {
        navigation.push('Screen2')
      }}
    />
  </View>
)

const Screen2 = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Screen 2</Text>
    <Button
      title="Go back"
      onPress={() => {
        navigation.pop()
      }}
    />
  </View>
)

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="FirstPage" component={FirstPage} />
        <Root.Screen name="SecondPage" component={SecondPage} />
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