import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Universities from '../../components/Universities';


const Home = () => {
    return (
        <SafeAreaView className="p-4">
            <View className="items-baseline">
                <View className="flex flex-row justify-between w-full px-4 items-center pb-8 pt-4">
                    <Text className="font-pbold text-xl">All Universities</Text>
                    <View>
                        <Icon name='select-compare' size={23} />
                    </View>
                </View>
            </View>
            <View className="px-4">
                <SearchBar />
            </View>
            {/* <View>
                <Universities />
            </View> */}
        </SafeAreaView>
    )
}

export default Home