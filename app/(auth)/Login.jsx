import { View, Text, Touchable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import api from '../../api/api'
import { useGlobalContext } from '../../context/GlobalProvider'

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const {setIsLoggedIn,setUser} = useGlobalContext()
    const handleLogin = async () => {
        console.log(form.email, form.password)
        try {
            const response = await api.post('login/', {
                email: form.email,
                password: form.password
            })
            const data = response
            setUser(data.data.access_token)
            setIsLoggedIn(true)
            router.push('/home')
            console.log(data.data)
        } catch (error) {
            console.log(error)
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: error.response.data.detail,
                button: 'Close',
            })
        }
    }
    return (
        <SafeAreaView className="bg-[#005f5f]">
            <View className="items-center justify-center w-full min-h-screen">
                <View className="w-full p-6 rounded-md -mt-24">
                    <Text className="text-3xl p-4 font-pbold text-white">Login</Text>
                    <View className="mt-4">
                        <FormField title='Email' placeholder='Enter your email' value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} />
                    </View>
                    <View className="mt-4">
                        <FormField title='Password' placeholder='Enter your password' value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} />
                    </View>
                    <View className="mt-4 px-3">
                        <TouchableOpacity className={`border border-white bg-white w-[100%] h-12 items-center justify-center rounded-lg focus:bg-white hover:bg-white ${!form.email || !form.password ? 'opacity-50' : ''}`}
                            onPress={handleLogin}
                            disabled={!form.email || !form.password}
                        >
                            <Text className="text-white font-pbold text-[#005f5f] text-lg">Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row gap-1 p-4">
                        <Text className="text-white">New User?</Text>
                        <Link href='/register'>
                            <Text className="text-white font-pbold">Register</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login