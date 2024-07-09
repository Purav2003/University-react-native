import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDebounce } from '../utils/useDbounce';

const SearchBar = ({searchItem,setSearchItem}) => {
    const handleTextChange = (e) => {
        setSearchItem(e)
    }
    return (
        <View className="w-full h-14 px-4 bg-black-100 border border-[#000] mt-2 rounded-lg items-center flex-row">
            <Icon name='search' size={23} />

            <TextInput
                placeholder="Enter University Name"
                onChangeText={useDebounce(handleTextChange,500)}
                className="w-full h-full pt-2 flex-1 ml-2 font-pmedium p-0"
                placeholderTextColor="#7b7b8b"                                
            />

        </View>
    )
}

export default SearchBar