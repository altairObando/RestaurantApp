import React, { createContext, PropsWithChildren, useState } from 'react';
import { Profile } from '../DTO/UserProfile';
import { Restaurant } from '../DTO/RestaurantDTO';

interface AppContextInterface {
    user?: string;
    restaurant?: Restaurant;
    isLogged: boolean;
    groups: string[];
    userProfile?: Profile,
}
const defaultAppContext: AppContextInterface = {
    user: undefined,
    restaurant: undefined,
    isLogged: false,
    groups: [],
    userProfile: undefined
};

interface MyContextTypeInterface {
    appData: AppContextInterface;
    setAppData: React.Dispatch<React.SetStateAction<AppContextInterface>>;
}

export const AppContext = createContext<MyContextTypeInterface>({
    appData: defaultAppContext,
    setAppData: () => null
})


export const AppProvider: React.FC<PropsWithChildren>= ({children}) => {
    const [ appData, setAppData ] = useState<AppContextInterface>(defaultAppContext);
    return <AppContext.Provider value={{ appData, setAppData }}>
        {children}
    </AppContext.Provider>
}