import React, { useContext, useEffect } from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, List, Text } from 'react-native-paper';
import { apiRequest, setAccessToken } from '../../Scripts/api';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { Restaurant } from '../../DTO/RestaurantDTO';
import { AppContext } from '../../Context/AppContext';

export default function Page(){
    const navigation = useNavigation();
    const { setAppData } = useContext(AppContext);
    const [ restaurant, setRestaurants ] = React.useState<Restaurant[]>([]);
    useEffect(()=>{
        apiRequest('GET','restaurants/', null)
        .then(response => {
            const restaurants = (response || []).map((restaurant: any) => {
                return {
                    id: restaurant.id,
                    locations: restaurant.locations,
                    owner: restaurant.owner,
                    name: restaurant.name,
                    description: restaurant.description,
                    address: restaurant.address,
                    phone: restaurant.phone,
                    tags: restaurant.tags
                }
            })
            setRestaurants(restaurants);
        }).catch(error => console.error(error))
    },[]);

    
    const logout =()=>{
        setAccessToken(null).then(()=> setAppData( prev => ({ ...prev, isLogged: false})));
    }

    return <SafeAreaProvider>
        <SafeAreaView style={{ 
                flex: 1, 
                marginTop: StatusBar.currentHeight || 0,
                padding: 10,
                justifyContent: 'space-between'
            }}>
            <Card style={{ width: '90%', minHeight: '40%', alignSelf: 'center' }}>
                <Card.Title title="Workspaces" />
                <Card.Content>
                    <FlatList
                    data={ restaurant || [] }
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ({item}) => <TouchableOpacity>
                        <List.Item 
                            key={ item.id } 
                            title={item.name } 
                            description={ item.description }
                            titleNumberOfLines={2}
                            left={ props => <List.Icon {...props} icon='folder'  /> } 
                        />
                    </TouchableOpacity>}
                    />
                </Card.Content>
            </Card>
            <Button mode='contained' onPress={ logout }>
                Close Session
            </Button>
        </SafeAreaView>
    </SafeAreaProvider>
}