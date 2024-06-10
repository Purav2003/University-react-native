import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {    
    return (
        <SafeAreaView className="p-12">
            <Text>Home</Text>            
        </SafeAreaView>
    )
}

export default Home