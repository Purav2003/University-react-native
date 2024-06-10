import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import logout from '../../utils/Logout'
const LogoutTab = () => {
    useEffect(()=>{
        logout()
    },[])
  return (
    <View>
      {/* <Text></Text> */}
    </View>
  )
}

export default LogoutTab