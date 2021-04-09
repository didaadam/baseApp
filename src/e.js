import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'


const e = ({navigation, route}) => {
    const coba = async() => {
        let bas = await AsyncStorage.getItem('MIMI')
        // alert(JSON.stringify(bas))
        let man = await AsyncStorage.getItem('ARR')
        console.log(bas)
        console.log(man)
        console.log(JSON.parse(man))
    }

    useEffect(() => {
        coba()
    })
    return (
    <View style={{backgroundColor: 'gray', flex: 1}}>
        <Text>alksdjaskdsjkl</Text>
    </View>
    )
}

export default e