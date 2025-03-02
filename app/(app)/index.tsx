import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { apiRequest, setAccessToken } from '../../Scripts/api';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { Restaurant } from '../../DTO/RestaurantDTO';
import { AppContext } from '../../Context/AppContext';
import { RestaurantList } from '../../components/Restaurant/RestaurantList';
import { Contact, Profile } from '../../DTO/UserProfile';
import { router } from 'expo-router'
export default function Page(){
    
    const { appData, setAppData } = useContext(AppContext);
    const [ restaurant, setRestaurants ] = React.useState<Restaurant[]>([]);
    const [ loading, setLoading ] = useState(false);
    // Get user profile
    useEffect(()=>{
        apiRequest('GET','profile/', null)
        .then(response => {
            const ProfileResponse = response.results.pop();
            const Profile: Profile = {
                id: ProfileResponse.id,
                user: ProfileResponse.user,
                owner: ProfileResponse.owner,
                contact: {
                    id: ProfileResponse.contact.id,
                    name: ProfileResponse.contact.name,
                    phone_number: ProfileResponse.contact.phone_number,
                    address: ProfileResponse.contact.address,
                    email: ProfileResponse.contact.email,
                    created_at: ProfileResponse.contact.created_at,
                    middle_name: ProfileResponse.contact.middle_name,
                    last_name: ProfileResponse.contact.last_name,
                } as Contact
            };
            setAppData( prev => ({...prev, userProfile: Profile }))
        })
    },[])
    const fetchRestaurants =()=>{
        setLoading(true)
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
        .finally(()=> setLoading(false))
    }
    useEffect(fetchRestaurants,[]);

    
    const logout =()=>{
        setAccessToken(null).then(()=> setAppData( prev => ({ ...prev, isLogged: false})));
    }

    const onRestaurantSelect =(restaurantId: number)=>{
        setAppData( prev => ({ ...prev, selectedRestaurant: restaurantId }));
        router.navigate('(home)')        
    }

    return <SafeAreaProvider>
        <SafeAreaView style={{ 
                flex: 1, 
                marginTop: StatusBar.currentHeight || 0,
                padding: 10,
                justifyContent: 'center',
                gap: 18
            }}>
                {
                 appData.userProfile && <Text variant='displayMedium' style={{ alignSelf: 'center' }}>
                    Welcome { appData.userProfile.contact.name }
                </Text> }
            <Card style={{ width: '90%', minHeight: '40%', alignSelf: 'center' }}>
                <Card.Title title="Workspaces" />
                <Card.Content>
                    <RestaurantList
                        restaurants={ restaurant }
                        onPress={ onRestaurantSelect }
                        onRefresh={ fetchRestaurants }
                        refreshing={ loading } />
                </Card.Content>
            </Card>
            <Button mode='contained' onPress={ logout }>
                Close Session
            </Button>
        </SafeAreaView>
    </SafeAreaProvider>
}