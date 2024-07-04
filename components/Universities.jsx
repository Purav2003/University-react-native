import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { useGlobalContext } from '../context/GlobalProvider'
import { Link } from 'expo-router'

const Universities = () => {
    const [universities, setUniversities] = useState([])
    const { user } = useGlobalContext();    
    const fetchUniversities = async () => {
        try {
            const response = await api.get('universities/',{
                headers:{
                    Authorization: `${user}`
                }
            })
            setUniversities(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchUniversities()
    },[])
  return (
    <View>
{
    universities?.length > 0 ? (
        <View className="mb-8 grid grid-cols-4">
            {universities?.map((university) => (
                <View key={university.id} className="items-center mb-4 px-12">
                    <Link href={`/university/${university.id}`}>
                        <Image
                            src={university.image_url}
                            alt={university.name}
                            className="w-64 h-64 rounded-md object-cover mt-12 hover:duration-200 hover:cursor-pointer filter hover:brightness-50"
                        />
                    </Link>
                    <View className="mt-3">
                        <View className='flex items-center justify-between'>
                        <Text className="font-bold">{university.name}</Text>
                        </View>
                        <Text className="text-gray-600">{university.location}</Text>
                    </View>
                </View>
            ))}
        </View>
    ) : (
        <Text className="text-center min-h-[70vh] flex items-center justify-center">No Universities Found</Text>
    )}
    </View>
  )
}

export default Universities