import { View, Text, Touchable, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { TouchableOpacity } from 'react-native'
import api from '../../api/api'
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { Link, router } from 'expo-router'

const Register = () => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', repassword: '' })
    const handleLogin = async () => {
        console.log(form.email, form.password)
        if (!form.email || !form.password || !form.repassword) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Please fill all fields',
                button: 'Close',
            })
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if (!emailRegex.test(form.email)) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Invalid email',
                button: 'Close',
            })
            return;
        }
        if (form.password !== form.repassword) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Password does not match',
                button: 'Close',
            })
            return;
        }
        try {
            const response = await api.post('register/', {
                email: form.email,
                password: form.password,
                name: form.name,
                phone: form.phone
            })
            console.log(response)
            if (response) {
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Account created successfully',
                    button: 'Close',
                })
                router.push('/Login')
                setForm({ name: '', phone: '', email: '', password: '', repassword: '' })
            }

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
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="items-center justify-center w-full min-h-screen">
                    <View className="w-full p-6 rounded-md -mt-24">
                        <Text className="text-3xl p-4 font-pbold text-white">Signup</Text>
                        <View className="mt-4">
                            <FormField title='Name' placeholder='Enter your name' value={form.name} handleChangeText={(e) => setForm({ ...form, name: e })} />
                        </View>
                        <View className="mt-4">
                            <FormField title='Email' placeholder='Enter your email' value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} />
                        </View>
                        <View className="mt-4">
                            <FormField title='Phone' placeholder='Enter your phone number' value={form.phone} handleChangeText={(e) => setForm({ ...form, phone: e })} />
                        </View>
                        <View className="mt-4">
                            <FormField title='Password' placeholder='Enter your password' value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} />
                        </View>
                        <View className="mt-4">
                            <FormField title='Retype Password' placeholder='Retype your password' value={form.repassword} handleChangeText={(e) => setForm({ ...form, repassword: e })} />
                        </View>
                        <View className="mt-4 px-3">
                            <TouchableOpacity className="border border-white bg-white w-[100%] h-12 items-center justify-center rounded-lg focus:bg-white hover:bg-white"
                                onPress={handleLogin}
                            >
                                <Text className="text-white font-pbold text-[#005f5f] text-lg">Create an Account</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row gap-1 p-4">
                            <Text className="text-white">Already a User?</Text>
                            <Link href='/Login'>
                                <Text className="text-white font-pbold">Login</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register