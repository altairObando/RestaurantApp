import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';

export default function HomeLayout(){
    return <Tabs initialRouteName='index' screenOptions={{ tabBarActiveTintColor: 'pink', headerShown: false,  }}>
        <Tabs.Screen name='index'  options={{ title: 'Locations', tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} name='coffee' /> }}/>
        <Tabs.Screen name='orders' options={{ title:'Orders', tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} name='clipboard-list' /> }}/>
        <Tabs.Screen name='profile' options={{ title: 'User Profile' ,tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} name='user' /> }}/>
    </Tabs>
}