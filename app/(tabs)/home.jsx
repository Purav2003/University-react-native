import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    const { user } = useGlobalContext();
    return (
        <SafeAreaView className="p-12">
            <Text>Home</Text>
            <Text>{user}</Text>
        </SafeAreaView>
    )
}

export default Home