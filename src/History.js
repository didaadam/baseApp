import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect } from 'react'
import { FlatList, Text, TouchableHighlight, View, StatusBar } from 'react-native'
import { useState } from 'react/cjs/react.development'


const Hitory = ({ navigation, route }) => {
    const [history, setHistory] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        getDataHistory()
        console.log(navigation)
    }, []);

    const getDataHistory = async () => {
        setIsFetching(true)
        let data = await AsyncStorage.getItem('HISTORY')
        console.log(data)
        setHistory(JSON.parse(data))
        setTimeout(() => {
            setIsFetching(false)
        }, 300);
    }

    const removeDataHistory = () => {
        AsyncStorage.removeItem('HISTORY')
        setHistory([])
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Text style={{ fontSize: 24 }}>History</Text>
                <TouchableHighlight onPress={() => removeDataHistory()} style={{ marginTop: 15, backgroundColor: '#f5a39d', padding: 10, borderRadius: 5 }}>
                    <Text>Remove History</Text>
                </TouchableHighlight>
            </View>
            <FlatList
                onRefresh={() => getDataHistory()}
                refreshing={isFetching}
                inverted
                data={history}
                renderItem={({ item, index, separators }) => (
                    <View key={item.key} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginVertical: 0, alignItems: 'flex-end', padding: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>.</Text>
                        <Text>{item.value}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default Hitory