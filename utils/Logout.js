
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router'
const logout = () => {
    SecureStore.deleteItemAsync('userToken')
    router.push('/Login')
}

export default logout