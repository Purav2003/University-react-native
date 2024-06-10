import { createContext,useContext,useState,useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const getToken = async () => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                setUser(token)
                return token;
            } else {
                console.log('No token found');
                return null;
            }
        } catch (error) {
            console.error('Error retrieving the token', error);
            return null;
        }
    };
    useEffect(()=>{
        getToken()
        setIsLoading(false)
    },[])
    return (
        <GlobalContext.Provider
        value={{
            isLoggedIn,
            user,
            isLoading,
            setUser,
            setIsLoggedIn

        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider