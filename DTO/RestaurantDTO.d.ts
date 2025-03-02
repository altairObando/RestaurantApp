export interface Restaurant {
    id:          number;
    locations:   Location[];
    owner:       string;
    name:        string;
    description: string;
    address:     string;
    phone:       string;
    tags:        null;
}

export interface Location {
    id:           number;
    sublocations: Location[] | null;
    location:     string;
    created_at:   Date;
    updated_at:   Date;
    restaurant:   number;
    parent:       number | null;
}
