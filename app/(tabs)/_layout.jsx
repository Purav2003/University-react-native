// TabsLayout.jsx
import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router'; // Removed Redirect import as it's not used
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const TabIcon = ({ icon,focusedIcon ,color, name, focused }) => (
  <View className={`items-center justify-center  bg-opacity-1 px-2 py-1 rounded-[30px] w-[80px] h-[60px]  ${focused?"bg-[#00b8b83a]":""}`}>    
  <View className={`w-[60px] text-center items-center justify-center `}>
    {name !== "Home" ?<Icon name={focused?focusedIcon:icon} size={23} color={focused?'#005f5f':'#000'} />    
    :<Icons name={focused?focusedIcon:icon} size={23} color={focused?'#005f5f':'#000'} />    }
  </View>    
  <Text className={`${focused?"font-bold":""} ${focused?"text-[#005f5f]":"text-black"} text-sm`}>{name}</Text>
  </View>
);

const TabsLayout = () => {
  return (
    <>
      <Tabs
        // ṛestricted to only 3 tabs                        
        tabNavigationOptions={{
            tabMode: 'restricted',
            tabModeRestricted: 3,
            }}

        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#fff",
            height: 68,

          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="home-outline" focusedIcon="home" color={color} focused={focused} name="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="person-outline" focusedIcon="person" color={color} focused={focused} name="Profile" />
            ),
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: 'Logout',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="logout" color={color} focused={focused} name="Logout" />
            ),
          }}
        />
        <Tabs.Screen 
            name='editProfile'
            // hidden from the tab bar
            options={{tabBarButton: () => null, tabBarVisible: false,headerShown: false}}


        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
