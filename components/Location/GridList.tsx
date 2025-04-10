import React from 'react';
import { FlatList } from 'react-native'
import GridItem from './GridItem';
import { Location } from '../../DTO/RestaurantDTO';
export interface GridListProps{
    locations: Location[] | null | undefined;
    subLocations: Location[] | null | undefined;
    showSubLoc: boolean;
    numColumns: number;
    onSubLocationPress: (location: Location) => void;
}

export const GridList : React.FC<GridListProps>=({ showSubLoc, subLocations, locations, numColumns, onSubLocationPress })=> {
    return (
        <FlatList 
                data={ showSubLoc ? subLocations : locations }
                numColumns={numColumns}
                key={ numColumns }
                renderItem={({item}: { item: Location }) => (
                    <GridItem
                        location={item}
                        onItemPress={onSubLocationPress}
                    />
                )}
                contentContainerStyle={{ padding: 8 }}
            />
    )
}