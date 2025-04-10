import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { ActivityIndicator, Alert, StatusBar, useWindowDimensions } from 'react-native';
import { fetchLocations } from '../../../Scripts/Locations/api';
import { AppContext } from '../../../Context/AppContext';
import { Location } from '../../../DTO/RestaurantDTO';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { GridList } from '../../../components/Location/GridList';

export default function IndexLayout(){
    const navigation = useNavigation();
    const { appData:{ restaurant } }  = useContext(AppContext);
    const [ locations, setLocations ] = useState<Location[] | null>();
    const [ subLocations, setSubLocations ] = useState<Location[] | null>();
    const [ showSubLoc, setShowSub  ] = useState<boolean>(false);    
    const [ loading, setLoading ] = useState(false);
    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 3 : 2;

    useEffect(()=>{
        if(!restaurant) return;
        setLoading(true);
        fetchLocations(restaurant.id)
        .then( newData => setLocations(newData))
        .catch(error => {
            Alert.alert('Error', error.message, [
                { text: 'OK', onPress: () => navigation.goBack() }       
            ])
        })
        .finally(()=> setLoading(false))
    },[ restaurant ]);
    const onSubLocationPress =(location: Location)=>{
        if(!location.sublocations || location.sublocations.length == 0){
            // TODO: Add open orders for this location.
            return;
        }
        setSubLocations(location.sublocations);
        setShowSub(true);
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: showSubLoc
                ? () => (
                    <IconButton 
                        icon='arrow-left' 
                        size={24} 
                        onPress={() => {
                            setShowSub(false);
                            setSubLocations(null);
                            navigation.setOptions({ title: 'Select a location' });
                        }} 
                    />
                )
                : undefined,
        });
    }, [showSubLoc]);
    if(loading) return <ActivityIndicator />
    return <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <GridList 
                locations={ locations }
                subLocations={ subLocations }
                showSubLoc={ showSubLoc }
                numColumns={ numColumns }
                onSubLocationPress={ onSubLocationPress }/>
        </SafeAreaView>
    </SafeAreaProvider>
}