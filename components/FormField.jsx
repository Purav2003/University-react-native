import { View, Text ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const FormField = ({ title, placeholder, value, handleChangeText }) => {
    const [showPassword, setShowPassword] = useState('')
    return (
        <View className="px-3">
            <Text className="font-pbold text-white">{title}</Text>
            <View className="w-full h-14 px-4 bg-black-100 border border-[#fff] mt-2 rounded-lg items-center flex-row">
            <TextInput
                placeholder={placeholder}
                value={value}
                keyboardType={title.includes('Phone') ? 'phone-pad' : (title.includes('Email') ? 'email-address' : 'default')}
                onChangeText={handleChangeText}
                className="w-full h-full pt-2 text-white flex-1 font-pmedium p-0"
                placeholderTextColor="#7b7b8b"
                secureTextEntry={title.includes('Password') && !showPassword ? true : false}
            />
            {
                title.includes('Password') && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {showPassword && <Icon name="eye-outline" size={20} color="#fff" />}
                        {!showPassword && <Icon name="eye-off-outline" size={20} color="#fff" />}
                    </TouchableOpacity>
                )
            }
            </View>
        </View>
    )
}

export default FormField