import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { images } from '../constants';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
// import CustomButton from '../components/customButton';
// import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {
  const {user} = useGlobalContext();
  if(user) return <Redirect href="/home" />
  // if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">        
          <Link href="/Login">Login</Link>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}