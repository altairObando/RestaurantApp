import React, { useContext, useEffect } from 'react';
import { apiRequest, getAccessToken,  } from '../../Scripts/api'
import { Login } from '../../components/Login';
import { Stack } from 'expo-router';
import { AppContext } from '../../Context/AppContext';

export default function AppLayout(){
    const { appData, setAppData } = useContext(AppContext)
    
    useEffect(()=>{
      getAccessToken().then( newToken => setAppData({ ...appData, isLogged: newToken !== null }) )
    },[])

    if(!appData.isLogged){
        return <Login updateLoginStatus={ value => setAppData({...appData, isLogged: value }) } />
    }

    return <Stack initialRouteName='index'>
      <Stack.Screen name='index'    options={{ title: 'Select your workspace' }}/>
      <Stack.Screen name='(home)'   options={{ headerShown: false }}/>
    </Stack>
}