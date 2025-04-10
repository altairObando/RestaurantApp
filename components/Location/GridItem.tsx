import React from 'react';
import { Card, Text } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Location } from '../../DTO/RestaurantDTO';
interface GridItemProps {
  location: Location;
  onItemPress: (location: Location) => void;
}
const GridItem: React.FC<GridItemProps>=( { location, onItemPress })=>{
    return <Card style={{
        flex: 1,
        margin: 8,
        padding: 16,
      }} 
      elevation={2}
      accessible={ true }
      onPress={()=> onItemPress(location)}>
      <Card.Content style={{ 
            display: 'flex', 
            flex: 1, 
            alignContent: 'center',
            alignItems: 'center',
            gap: 10 }}>
        <Text>{location.location} { location.sublocations?.length ?? ''   }</Text>
        { location.sublocations && location.sublocations.length > 0 && <FontAwesome name='building' size={30} color='black' />}
        { !location.sublocations && <MaterialIcons name='fastfood' size={30} color='black' />}
      </Card.Content>
    </Card>
}

export default GridItem;