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

const Home = ({ navigation, route }) => (
    <View style={styles.screen}>
        <StatusBar
            animated={true}
            backgroundColor="#5b9af5"
        />
        <Text style={styles.title}>Simply Calc</Text>
        <Button
            title="Start App"
            color={'#5b9af5'}
            onPress={() => {
                navigation.push('Calc')
            }}
        />
    </View>
)

const styles = StyleSheet.create({
    screen: {
        // marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#d9e7fc'
    },
    title: {
        padding: 20,
        fontSize: 42,
        color: 'black'
    },
})

export default Home