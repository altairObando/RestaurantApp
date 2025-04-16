import React, { useContext, useState } from 'react';
import { View } from 'react-native'
import { AppContext } from '../../../Context/AppContext';
import { LocationListWithSearch } from '../../../components/Location/LocationList'
import { Location } from '../../../DTO/RestaurantDTO';
import { Text } from 'react-native-paper';


export default function Orders(){
    const { appData: { restaurant } } = useContext(AppContext);
    const [ location, setLocation ] = useState<Location>({} as Location);
    return <View style={{ flex: 1, gap: 5 }}>
        { !location.id && <LocationListWithSearch 
            locations={ (restaurant?.locations ?? []) } 
            onLocationPress={ (item: Location) => {
                setLocation(item);
            } } />}
        <Text> Ubicacion { location.location } </Text>
    </View>
}