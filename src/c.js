import React from 'react'
import { Button, View } from 'react-native'


const c = ({navigation, route}) => {
    return (
    <View style={{backgroundColor: 'gray', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title={'title="Go to Screen 2"'} onPress={() => navigation.push("ThirdPage")} style={{backgroundColor: 'red', width: 50, height: 50}}/>
    </View>
    )
}

export default c