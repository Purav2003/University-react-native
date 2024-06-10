import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import api from '../../api/api.js';
import logout from '../../utils/Logout.js'
import { Link, router } from 'expo-router';
import FormField from '../../components/FormField.jsx';

const EditProfile = () => {
    const { user } = useGlobalContext();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);
    const [newData, setNewData] = useState(null);

    const getUser = async () => {
        setLoading(true)
        try {
            const response = await api.get('profile', {
                headers: {
                    Authorization: `${user}`,
                },
            });
            setData(response.data);
            setNewData(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                logout()
            }
            // console.error('Failed to fetch user data:', error, error.response.status);
        }
        finally {
            setLoading(false)
        }
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await api.put('update-profile/', {
                new_email: newData.email,
                new_name: newData.name,
                new_phone: newData.phone
            }, {
                headers: {
                    Authorization: `${user}`,
                },
            });
            setData(response.data);
            router.replace('/profile?refresh=true')
        } catch (error) {
            if (error.response.status === 401) {
                logout()
            }
            // console.error('Failed to fetch user data:', error, error.response.status);
        }
        finally {
            setLoading(false)
        }
    }

    const handleGoBack = () => {
        // setNewData(data);
        getUser()
        router.push('/profile')
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
            <View className="flex-1 p-6 rounded-lg justify-center items-center">
                <Text className="text-3xl font-pextrabold text-[#005f5f]">Edit Profile</Text>
                {loading ? <View className="h-screen w-full items-center justify-center">
                    <Text>Loading</Text>
                </View> : <View className="mt-8 space-y-4 min-w-full max-w-full">
                    <ProfileItem label="Name" value={newData?.name} field="name" setNewData={setNewData} newData={newData} />
                    <ProfileItem label="Email" value={newData?.email} field="email" setNewData={setNewData} newData={newData} />
                    <ProfileItem label="Phone" value={newData?.phone} field="phone" setNewData={setNewData} newData={newData} />
                </View>}
                <View className="mt-12 w-full text-center rounded-md flex-row space-x-4 justify-center items-center">
                    <View className="bg-[#005f5f] px-4 rounded-md">
                        <TouchableOpacity className="text-center rounded-md border-0" onPress={handleGoBack}>
                            <Text className="text-center text-white p-4 font-pmedium text-lg">Go Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-blue-500 px-4 rounded-md">
                        <TouchableOpacity onPress={handleSubmit} className="text-center rounded-md border-0">
                            <Text className="text-center text-white p-4 font-pmedium text-lg">Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const ProfileItem = ({ label, value, field, setNewData, newData }) => {
    return (
        <View className="flex py-2">
            <Text className="text-lg font-psemibold text-gray-700 mr-2">{label}</Text>
            <TextInput value={value} onChangeText={(e) => setNewData({ ...newData, [field]: e })} className="font-pmedium text-lg border border-gray-200 px-2 py-2 min-w-full max-w-full mt-2" />
        </View>
    );
};

export default EditProfile;
