import { Slot, SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import GlobalProvider from '../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "SFPRODISPLAYREGULAR": require('../assets/fonts/SFPRODISPLAYREGULAR.ttf'),
        "SFPRODISPLAYMEDIUM_0": require('../assets/fonts/SFPRODISPLAYMEDIUM_0.ttf'),
        "SFPRODISPLAYBOLD": require('../assets/fonts/SFPRODISPLAYBOLD.ttf'),
        "Raleway-Light": require('../assets/fonts/Raleway-Light.ttf'),
        "Raleway-Medium": require('../assets/fonts/Raleway-Medium.ttf'),
        "Raleway-Regular": require('../assets/fonts/Raleway-Regular.ttf'),
        "Raleway-SemiBold": require('../assets/fonts/Raleway-SemiBold.ttf'),
        "Raleway-Thin": require('../assets/fonts/Raleway-Thin.ttf'),
    });

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null; // Optionally, you can return a loading spinner or some placeholder
    }   
    return (
        <GlobalProvider>
            <AlertNotificationRoot>
                <Stack>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="details/[query]" options={{ headerShown: false }} />
                </Stack>
            </AlertNotificationRoot>
        </GlobalProvider>
    );
};

export default RootLayout;
