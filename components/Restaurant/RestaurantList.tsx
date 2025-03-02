import React from 'react';
import { Restaurant } from '../../DTO/RestaurantDTO';
import { FlatList, Touchable, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

interface RestaurantListProps {
    restaurants: Restaurant[];
    onPress: ( restaurantId: number ) => void;
    onRefresh: () => void;
    refreshing: boolean;
}

interface RestaurantListItemProps{
  restaurant: Restaurant;
  onPress: ( restaurantId: number ) => void;
}


export const RestaurantListItem:React.FC<RestaurantListItemProps> = ({ restaurant, onPress })=>{
    return <>
    <TouchableOpacity onPress={ ()=> onPress(restaurant.id) }>
      <List.Item 
        key={ restaurant.id }
        title={ restaurant.name }
        descriptionNumberOfLines={ 2 }
        descriptionEllipsizeMode='tail'
        description={ `${restaurant.owner} - ${ restaurant.phone }` }
        left={ props => <List.Icon {...props } icon='folder' /> }/>
    </TouchableOpacity>
  </>
}

export const RestaurantList:React.FC<RestaurantListProps> = ({ restaurants, onPress, onRefresh, refreshing })=>{
    return <FlatList
        data={restaurants || [] }
        keyExtractor={(item : Restaurant) => item.id.toString() }
        renderItem={ ({item}) => <RestaurantListItem restaurant={item} onPress={ onPress } /> }
        onRefresh={ onRefresh }
        refreshing={ refreshing }/>
}