import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UniversityList = ({ universities, loading, totalPage, page, setPage }) => {
    const navigation = useNavigation();

    const decreaseCounter = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const increaseCounter = () => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }

    const goToDetail = (id) => {
        navigation.push('details/[query]', { query: id });
    }
    return (
        <View >
            {loading ? (
                <View className="min-h-[70vh] flex items-center justify-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <>
                    <View className="mt-8 w-full">
                        {universities.map((university, index) => (
                            <TouchableOpacity className="w-full p-4" key={index} onPress={() => goToDetail(university?.id)}>
                                <Image source={{ uri: university.image_url }} className="w-full h-64 mb-2 rounded-md" />
                                <View className="flex-row justify-between w-full">
                                    <Text className="text-xl font-pbold mb-1 max-w-[70%]">{university.name}</Text>
                                    <Text className="text-lg items-center font-bold mb-1">{university.uniReview} <Icons name='star' color="#ff9800" size={20} /></Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="mb-32">
                        <View className="flex-row justify-end items-center mt-4 mr-2">
                            <TouchableOpacity className={`${page == 1 ? "p-2 border bg-[#00b8b83a] border-[#00b8b83a]" : "border bg-[#005f5f] border-[#005f5f] p-2"}`} onPress={decreaseCounter} disabled={page == 1}>
                                <Icons name="chevron-left" size={35} color="#fff" />
                            </TouchableOpacity>
                            <Text className="px-6 font-pmedium text-2xl">{page}</Text>
                            <TouchableOpacity className={`${page == totalPage || !totalPage ? "p-2 border bg-[#00b8b83a] border-[#00b8b83a]" : "border border-[#005f5f] bg-[#005f5f] p-2"}`} onPress={increaseCounter} disabled={page == totalPage || !totalPage}>
                                <Icons name="chevron-right" size={35} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>

            )}
        </View>
    );
};

export default UniversityList;