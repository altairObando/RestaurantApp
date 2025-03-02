import React, { createContext, PropsWithChildren, useState } from 'react';
import { Profile } from '../DTO/UserProfile';

interface AppContextInterface {
    user?: string;
    restaurantId?: number;
    isLogged: boolean;
    groups: string[];
    userProfile?: Profile
}
const defaultAppContext: AppContextInterface = {
    user: undefined,
    restaurantId: undefined,
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