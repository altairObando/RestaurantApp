import React, { createContext, PropsWithChildren, useState } from 'react';
import { Profile } from '../DTO/UserProfile';
import { Restaurant } from '../DTO/RestaurantDTO';
import { InitialSetup } from '../DTO/InitialSetup';

interface AppContextInterface {
    user?: string;
    restaurant?: Restaurant;
    isLogged: boolean;
    groups: string[];
    userProfile?: Profile,
    initialSetup?: InitialSetup;
}

interface MyContextTypeInterface {
    appData: AppContextInterface;
    setAppData: React.Dispatch<React.SetStateAction<AppContextInterface>>;
}

export const AppContext = createContext<MyContextTypeInterface>({
    appData: {} as AppContextInterface,
    setAppData: () => null
})


export const AppProvider: React.FC<PropsWithChildren>= ({children}) => {
    const [ appData, setAppData ] = useState<AppContextInterface>({} as AppContextInterface);
    return <AppContext.Provider value={{ appData, setAppData }}>
        {children}
    </AppContext.Provider>
}