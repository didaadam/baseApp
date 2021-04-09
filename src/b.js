import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    useColorScheme,
    View,
    Button
} from 'react-native';

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
export default Screen2