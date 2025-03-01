import { Alert, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { login as doLogin } from '../Scripts/api';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';

export default function Login() {
  const [ userName, setUserName ] = useState<string>("noel");
  const [ password, setPassword ] = useState<string>("2012");
  const [ showPassword, setShowPassword] = useState<boolean>(false)
  const [ isLoading, setIsLoading] = useState<boolean>(false);
  const onLoginClick = async ()=> {
    try {
      setIsLoading(true);
      try {
        const loginResponse = await doLogin(userName, password);
        if ( loginResponse.ok ){
          router.replace('/');
        }
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
      router.replace('/');
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }
  return <View style={styles.container}>
    <View style={ styles.layout }>
        <Image source={require('../assets/icon.png')} style={{ flex:2, width: 600, height: 200,resizeMode: 'cover' }} />
        <Text style={{ alignSelf: 'center'}}>New Login</Text>
        <TextInput 
          autoCapitalize='none' 
          placeholder='Username' 
          value={userName}
          mode='outlined'
          onChangeText={newValue => setUserName(newValue)} 
          left={<TextInput.Icon icon='email' />}
          keyboardType='email-address'/>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={newValue => setPassword(newValue)}
          mode='outlined'
          left={<TextInput.Icon icon='key' />}
          secureTextEntry={ !showPassword }
          right={ <TextInput.Icon icon={ showPassword ? 'eye': 'eye-off' } onPress={ ()=> setShowPassword(!showPassword) } /> }/>
        <Button
          mode='contained'
          disabled={ isLoading }
          onPress={onLoginClick }>
            Login</Button>
        { isLoading && <ActivityIndicator /> }
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    rowGap: 10,
    width: "100%", height: "100%"
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    rowGap: 20,    
  },
});