import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getAccessToken, setAccessToken } from '../../Scripts/api'
import { Login } from '../../components/Login';

export default function AppLayout(){
    const [ userLogged, setIsLogged ] = React.useState<boolean>(false);
    useEffect(()=>{
      getAccessToken().then( newToken => setIsLogged(newToken!=null))
    },[])

    if(!userLogged){
        return <Login updateLoginStatus={ value => setIsLogged(value) } />
    }
    const logout =()=>{
      setAccessToken(null).then(()=> setIsLogged(false));
    }
    return <View style={{ 
          display: 'flex', 
          flexDirection:'column',
          alignItems: 'center',
          padding: 100,
          gap: 20
        }}>
        <Text>App Layout</Text>
        <Button onPress={ logout } mode='contained' > Log out </Button>
    </View>

    // useEffect
    // if(!token) return <Redirect href='/login' />
    // return <View>
    //     <Text>App Layout</Text>
    // </View>
    // return <Stack>
    // {/* <Stack.Screen name='index' options={{ headerBackTitle: 'Chose Store', title:'Chose Store' }}/>
    // <Stack.Screen name='newStore' options={{ 
    //     title: 'New Store',
    //     headerShown: true,
    //   }}/>
    // <Stack.Screen name='(home)' options={{
    //   title: 'Store Options',
    //   headerShown: false,
    // }}/> */}
  // </Stack>
}