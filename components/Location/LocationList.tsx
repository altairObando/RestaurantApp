import React from  'react';
import { Location } from '../../DTO/RestaurantDTO';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import { StyleSheet } from 'react-native';

export interface ListProps {
    locations: Array<Location> | null | undefined;
    onLocationPress: (location: Location) => void;
    searchText?: string | null | undefined;
}

function buildList(item: Location, onLocationPress: (location: Location) => void) {
    if (!item.sublocations) {
        return (
            <TouchableOpacity 
                key={item.id} 
                onPress={() => onLocationPress(item)}>
                <List.Item 
                    title={`${ item.id} - ${ item.location }`}
                    left={props => <List.Icon {...props} icon="map-marker" />} 
                />
            </TouchableOpacity>
        );
    }
    
    return (
        <List.Accordion 
            id={String(item.id)}
            title={item.location}
            key={`accordionFor-${item.id}`}
            left={props => <List.Icon {...props} icon="folder" />}>
            {item.sublocations.map(subLocation => 
                buildList(subLocation, onLocationPress)
            )}
        </List.Accordion>
    );
}

export const LocationList: React.FC<ListProps> = ({ locations, onLocationPress }) => {
    return <>
        <FlatList
            data={[...(locations ||[])].sort((a, b) => {
                if (a.sublocations && !b.sublocations) return -1;
                if (!a.sublocations && b.sublocations) return 1;
                return 0;
            })}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <List.AccordionGroup>
                {buildList(item, onLocationPress)}
            </List.AccordionGroup>}
        />
    </>
}

export const LocationListWithSearch: React.FC<ListProps> = ({ locations, onLocationPress }) => {
    const [searchText, setSearchText] = React.useState<string>('');
    const [debouncedSearchText] = useDebounce(searchText, 300);

    const filteredLocations = React.useMemo(() => {
        return (locations || []).filter(location => 
            location.location.toLowerCase().includes(debouncedSearchText.toLowerCase()) || 
            debouncedSearchText === ''
        );
    }, [locations, debouncedSearchText]);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder='Buscar ubicación'
                value={searchText}
                onChangeText={setSearchText}
                inputMode='search'
                style={styles.searchBar}
                icon='magnify'
                clearIcon='close'
            />
            <LocationList 
                locations={filteredLocations}
                onLocationPress={onLocationPress} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
        rowGap: 8,
    },
    searchBar: {
        elevation: 4,
        borderRadius: 8,
    }
});

export const LocationListChildsNodes: React.FC<ListProps> = ({ locations, onLocationPress }) => {
    const childsNodes = React.useMemo(() => {
        const childs: Location[] = [];
        
        const getChilds = (locations: Array<Location>) => {
            locations?.forEach(location => {
                if (location.sublocations) {
                    getChilds(location.sublocations);
                } else {
                    childs.push(location);
                }
            });
        };
        
        getChilds(locations || []);
        return childs;
    }, [locations]);

    return <LocationList locations={childsNodes} onLocationPress={onLocationPress} />;
}