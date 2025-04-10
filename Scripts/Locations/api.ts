import { apiRequest } from '../api';
import { Location } from '../../DTO/RestaurantDTO';

/**
 * Fetches location data for a specific restaurant from the API
 * 
 * @param restaurantId - The unique identifier of the restaurant
 * @returns Promise<Location[]> - Array of Location objects containing location details
 * 
 * @remarks
 * This function makes a GET request to fetch locations associated with a restaurant.
 * It transforms the raw API response into typed Location objects.
 * 
 * @example
 * ```typescript
 * const locations = await fetchLocations(123);
 * ```
 */
export async function fetchLocations(restaurantId: number){
    const response = await apiRequest('GET',  `locations/?restaurantId=${ restaurantId }`, null);
    const data: Location[] = response.results.map( (item: any) => {
        return {
           id: item.id,
           sublocations: item.sublocations,
           location: item.location,
           created_at: item.created_at,
           updated_at: item.updated_at,
           restaurant: item.restaurant,
           parent: item.parent,
        } as Location
    });
    return data;
}