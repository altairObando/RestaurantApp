import React, { useContext } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { AppContext } from '../../../Context/AppContext';

export default function HomeLayout(){
    const { appData:{ restaurant } } = useContext(AppContext);
    return <Tabs 
                initialRouteName='index'
                screenOptions={{ 
                    tabBarActiveTintColor: 'red', 
                    headerShown: true, 
                    headerTitle: restaurant?.name ?? 'Loading'}}>
        <Tabs.Screen name='index'  options={{  tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} name='coffee' /> }}/>
        <Tabs.Screen name='orders' options={{  tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} name='clipboard-list' /> }}/>
        <Tabs.Screen name='profile' options={{ tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} name='user' /> }}/>
    </Tabs>
}