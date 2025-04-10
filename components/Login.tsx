import { Alert, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { login as doLogin } from '../Scripts/api';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';

interface ILoginProps {
    updateLoginStatus: ( newStatus: boolean )=> void
}



export const Login: React.FC<ILoginProps>=(props)=>{
    const [ userName, setUserName ] = useState<string>("noel");
    const [ password, setPassword ] = useState<string>("2012");
    const [ showPassword, setShowPassword] = useState<boolean>(false)
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const onLoginClick = async ()=> {
    try {
        setIsLoading(true);
        try {
            const loginResponse = await doLogin(userName, password);
            props.updateLoginStatus(loginResponse.ok);
            if(!loginResponse.ok){
                Alert.alert(loginResponse.msg)
            }
        } catch (error) {
            Alert.alert(String(error))
        }finally{
            setIsLoading(false)
        }
        } catch (error) {
            Alert.alert(String(error))
        }finally{
            setIsLoading(false)
        }
    }
    return <View style={styles.container}>
    <View style={ styles.layout }>
        <Image source={require('../assets/icon.png')} style={{ borderRadius: 25, alignSelf: 'center', width: 200, height: 200, resizeMode: 'contain' }} />
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