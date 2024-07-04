import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

const UniversityList = ({ universities, loading, totalPage,page,setPage }) => {
    const decreaseCounter = () => {
        if(page > 1) {
            setPage(page - 1)
        }
    }
    const increaseCounter = () => {
        // if(page < totalPage) {
            setPage(page + 1)
        // }
    }
    
    return (
        <View >
            {loading ? (
                <View className="min-h-[70vh] flex items-center justify-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <>
                    <View className="mt-8">
                        {universities.map((university, index) => (
                            <View key={index} className="mb-4 p-4 rounded-md">
                                <Image source={{ uri: university.image_url }} className="w-full h-64 mb-2 rounded-md" />
                                <View className="flex-row justify-between">
                                    <Text className="text-xl font-pbold mb-1 max-w-[70%]">{university.name}</Text>
                                    <Text className="text-lg items-center font-psemibold mb-1">{university.uniReview} <Icons name='star' color="#ff9800" size={20} /></Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View className="mb-32">
                        <View className="flex-row justify-end items-center mt-4 mr-2">
                            <TouchableOpacity className={`${page == 1 ? "p-2 bg-gray-200 border-gray-100" : "border border-black p-2"}`} onPress={decreaseCounter} disabled={page==1}>
                                <Icons name="chevron-left" size={35} color={page==1?"#fff":"#000"} />
                            </TouchableOpacity>
                            <Text className="px-6 font-pmedium text-2xl">{page}</Text>
                            <TouchableOpacity className={`${page == totalPage || !totalPage ? "p-2 bg-gray-200 border-gray-100" : "border border-black p-2"}`} onPress={increaseCounter} disabled={page==totalPage || !totalPage}>
                                <Icons name="chevron-right" size={35} color={page==totalPage || !totalPage ?"#fff":"#000"}/>
                                </TouchableOpacity>
                        </View>
                    </View>
                </>

            )}
        </View>
    );
};

export default UniversityList;