import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/api';
import GoBack from '../../components/GoBack';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useGlobalContext } from '../../context/GlobalProvider';
import MapView, { Marker } from 'react-native-maps';

const UniversityDetail = () => {
  const { query } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [universityData, setUniversityData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await api.get(`university/${query}`, {
      headers: {
        'Authorization': `${user}`,
      },
    });
    setUniversityData(response.data);
    console.log(response.data);
    setLoading(false);
  };

  const visitWebsite = () => {
    const url = universityData.website;
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <GoBack route={'(tabs)'} name={universityData?.name} />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {universityData && (
          <>
            <View className="relative">
              <Image source={{ uri: universityData.image_url }} className="w-full h-64" />
              <View className="absolute bottom-0 w-full py-7 inset-0 bg-[#0000008a] ">
              </View>
              <Text className="absolute bottom-3 left-4 text-2xl text-white font-pbold">{universityData.name}</Text>
            </View>

            <View className="p-4 bg-white rounded-lg shadow-lg mt-4 mx-4">
              <Text className="text-xl font-pbold mb-2">Tuition Fees</Text>
              <View className="flex-row items-center gap-x-2">
                <Icons name="money" size={25} color={"#000"} />
                <Text className="text-lg mb-1 font-pmedium">$ {universityData.tuition_fee}</Text>
              </View>
            </View>

            <View className="p-4 bg-white rounded-lg shadow-lg mt-4 mx-4">
              <Text className="text-xl font-pbold mb-2">Courses Offered</Text>
              <View className="gap-y-2">
                {universityData.courses_offered?.map((course, index) => (
                  <Text key={index} className="text-lg mb-1 font-pmedium">- {course}</Text>
                ))}
              </View>
            </View>

            <View className="p-4 bg-white rounded-lg shadow-lg mt-4 mx-4">
              <View className="flex-row gap-x-2 items-center">
                <Icon name="map-marker-outline" size={25} color={"#000"} />
                <Text className="text-xl font-pbold items-center">
                  Location</Text>
              </View>

              <View className="w-full h-64 px-0 m-2">
                <MapView
                  className="w-[90vw] h-64"
                  style={styles.map}
                  initialRegion={{
                    latitude: universityData?.map?.lat,
                    longitude: universityData?.map?.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  showsUserLocation={true}
                >
                  {universityData?.map?.lat && universityData?.map?.long && (
                    <Marker
                      coordinate={{
                        latitude: universityData.map.lat,
                        longitude: universityData.map.long,
                      }}
                      title={universityData.name}
                      description={universityData.location}
                      icon={{
                        uri:
                          'https://cdn.iconscout.com/icon/free/png-256/google-maps-2028313-1706391.png',
                      }
                      }
                    />
                  )}
                </MapView>
              </View>
            </View>

            <View className="p-4 bg-white rounded-lg shadow-lg mt-4 mx-4">
              <Text className="text-xl font-pbold mb-2">Overview</Text>
              <View className="gap-y-2">
                <View className="flex-row gap-2 items-center">
                  <Icon name="trophy-outline" size={20} color={"#000"} />
                  <Text className="text-lg font-pmedium mb-1 text-gray-600">Rank: {universityData.ranking}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Icon name="office-building-outline" size={20} color={"#000"} />
                  <Text className="text-lg font-pmedium mb-1 text-gray-600">Established Year: {universityData.established_year}</Text>
                </View>
                <View className="flex-row gap-2">
                  <Icon name="move-resize" size={25} color={"#000"} />
                  <Text className="text-lg font-pmedium mb-1 text-gray-600">Campus Size: {universityData.campus_size}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Icons name="people-outline" size={25} color={"#000"} />
                  <Text className="text-lg font-pmedium mb-1 text-gray-600">Total Students: {universityData.total_students}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Icon name="percent-outline" size={25} color={"#000"} />
                  <Text className="text-lg font-pmedium mb-1 text-gray-600">Student Faculty Ratio: {universityData.student_faculty_ratio}</Text>
                </View>
              </View>
            </View>

            <View className="p-2 mt-4 mx-2 flex-row justify-between">
              <TouchableOpacity className="bg-[#005f5f] p-4 rounded-lg flex-row items-center justify-between shadow-lg flex-1 mr-2" onPress={visitWebsite}>
                <Text className="text-[16px] text-white text-center font-medium">Visit Website</Text>
                <Icon name="arrow-top-right" size={20} color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#005f5f] bg-[#fff] p-4 rounded-lg flex-row items-center shadow-lg justify-between flex-1 ml-2">
                <Text className="text-[16px] text-center font-medium text-[#005f5f]">Write a Review</Text>
                <Icon name="square-edit-outline" size={20} color={"#005f5f"} />
              </TouchableOpacity>
            </View>
          </>
        )}
        {
          loading && <View className="min-h-[80vh] items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default UniversityDetail;
