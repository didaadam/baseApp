import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button
} from 'react-native';

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

export default Screen1