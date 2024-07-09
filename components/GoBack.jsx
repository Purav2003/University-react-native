import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from 'expo-router'
const GoBack = ({ route, name }) => {
    const navigation = useNavigation();
    const back = () => {
        navigation.push(route);

    }

    return (
        <View className="bg-white p-4 flex-row items-center gap-3">
            <TouchableOpacity onPress={()=>back(1,2)} >
                <Icon name="keyboard-backspace" size={32} />
            </TouchableOpacity>
                {
                    name && <Text className="font-pbold text-xl -mt-1">{name}</Text>
                }
        </View>
    )
}

export default GoBack