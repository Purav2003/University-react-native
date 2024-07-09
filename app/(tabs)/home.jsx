import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { View, Text, Image, ScrollView, RefreshControl, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UniversityList from '../../components/UniversityList';
import api from '../../api/api';

const Home = () => {
    const { user } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const fetchUniversities = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/universities?search_term=${searchItem}&page_no=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${user}`
                }
            });
            setUniversities(response.data);
            const items = response.data.map((item) => item.total_universities);
            console.log(items);
            setTotalPage(Math.ceil(items[0] / 8))
            console.log(items);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setSearchItem('');
        setRefreshing(true);
        await fetchUniversities();
        setRefreshing(false);
    };


    useEffect(() => {
        fetchUniversities();
    }, [searchItem, user, page]);

    if (!user) return <View>
        <Text>Loading</Text>
    </View>
    else return (
        <SafeAreaView className="p-4">
            <View className="items-baseline ">
                <View className="flex flex-row fixed justify-between w-full px-4 items-center pb-8 pt-4">
                    <Text className="font-pbold text-xl">All Universities</Text>
                    <View>
                        <Icon name='select-compare' size={23} />
                    </View>
                </View>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View className="px-4">
                    <SearchBar
                        setSearchItem={setSearchItem}
                        searchItem={searchItem}
                    />
                </View>
                <View>
                    {user && universities?.length > 0 && <UniversityList
                        fetchUniversities={fetchUniversities}
                        universities={universities}
                        loading={loading}
                        totalPage={totalPage}
                        page={page}
                        setPage={setPage}
                    />}
                    {
                        universities?.length === 0 && <View className="items-center justify-center min-h-[70vh] gap-4">
                            <Text className="font-pmedium text-xl">No Universities Found</Text>
                            <TouchableOpacity onPress={onRefresh} className="bg-[#005f5f] py-2 px-4 rounded-md mt-4">
                                <Text className="text-white font-pmedium text-lg">Go Home</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home