import { Restaurant } from "./Restaurant.d";
import { Location } from "./Location.d";
export interface InitialSetup {
    user:         User;
    role:         String[] | null | undefined;
    restaurants:  Restaurant[] | null | undefined;
    locations:    Location[] | null | undefined;
    menus:        any[]  | null | undefined;
    app_settings: AppSettings  | null | undefined;
}

export interface AppSettings {
    currency:                 string;
    tax_rate:                 number;
    order_statuses:           string[] | null | undefined;
    payment_methods:          string[] | null | undefined;
    table_management_enabled: boolean;
    reservation_enabled:      boolean;
}

export interface User {
    username:     string;
    email:        string;
    is_superuser: boolean;
    groups:       any[];
}