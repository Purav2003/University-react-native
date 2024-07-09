import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import api from '../../api/api';
import logout from '../../utils/Logout';
import { Link, router} from 'expo-router';
import { useRoute } from '@react-navigation/native';

const Profile = () => {
    const { user } = useGlobalContext();    
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);
    const currentRoute = useRoute();

    const getUser = async () => {
        setLoading(true)
        try {
            const response = await api.get('profile', {
                headers: {
                    Authorization: `${user}`,
                },
            });
            setData(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                logout()
            }
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
            getUser();        
    }, []);

    useEffect(()=>{
        if(currentRoute.params?.refresh){
            getUser()
            router.replace('/profile') 
        }
    })

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
            <View className="flex-1 p-6 rounded-lg justify-center items-center">
                <Text className="text-3xl font-pextrabold text-[#005f5f]">User Profile</Text>
                {loading ? <View className="h-screen w-full items-center justify-center">
                    <Text>Loading</Text>
                </View> : <View className="mt-8 space-y-4">
                    <ProfileItem label="Name" value={data?.name} />
                    <ProfileItem label="Email" value={data?.email} />
                    <ProfileItem label="Phone" value={data?.phone} />
                </View>}
                <View className="mt-12 w-full bg-[#005f5f] text-center rounded-md">
                    <Link href="/editProfile" className="text-center py-4 rounded-md border-0">
                        <Text className="text-center text-white font-pmedium text-lg">Edit Profile</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

const ProfileItem = ({ label, value }) => (
    <View className="flex-row items-center py-2">
        <Text className="text-lg font-bold text-gray-700 mr-2">{label}:</Text>
        <Text className="text-lg font-pregular text-gray-600">{value}</Text>
    </View>
);
export default Profile;