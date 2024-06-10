// TabsLayout.jsx
import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router'; // Removed Redirect import as it's not used
import Icon from 'react-native-vector-icons/Octicons';

const TabIcon = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center gap-2">
    <Icon name={icon} size={20} color={focused ? '#ff9800' : '#fff'} />
    <Text className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'}`} style={{ color: color }}>
      {name}
    </Text>
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
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#005f5f",
            borderTopWidth: 1,
            borderTopColor: "#005f5f",
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="home" color={color} focused={focused} name="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="person" color={color} focused={focused} name="Profile" />
            ),
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: 'Logout',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="sign-out" color={color} focused={focused} name="Logout" />
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
