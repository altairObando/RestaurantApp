import * as SecureStore from 'expo-secure-store';
const BASE_URL = 'http://192.168.3.108/api/',
      API_URL  = BASE_URL +'v1/';



let accessToken : string|null = null;


export const getAccessToken = async () => {
    if (accessToken) { 
        return accessToken;
    }
    accessToken = await SecureStore.getItemAsync('accessToken');
    return accessToken;
};

// Función para guardar el token de acceso en SecureStore y memoria
export const setAccessToken = async (token : string|null ) => {
    accessToken = token;
    if (token) {
        await SecureStore.setItemAsync('accessToken', token);
    } else {
        await SecureStore.deleteItemAsync('accessToken');
    }
};
// Función para obtener el refresh token de SecureStore
const getRefreshToken = async () => {
    return await SecureStore.getItemAsync('refreshToken');
};

// Función para guardar el refresh token en SecureStore
const setRefreshToken = async (token : string|null ) => {
    if (token) {
        await SecureStore.setItemAsync('refreshToken', token);
    } else {
        await SecureStore.deleteItemAsync('refreshToken');
    }
};
// Función para refrescar el token de acceso
const refreshToken = async () => {
    const refreshTokenValue = await getRefreshToken();
    if (!refreshTokenValue) {
        // No hay refresh token, usuario debe volver a iniciar sesión
        return null;
    }

    try {
        const request = await fetch(`${BASE_URL}/api/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({refresh: refreshTokenValue}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        const { access: newAccessToken, refresh: newRefreshToken } = response;
        await setAccessToken(newAccessToken);
        if (newRefreshToken) { // Guardar nuevo refresh token si se recibe
            await setRefreshToken(newRefreshToken);
        }
        return newAccessToken; // Devolver el nuevo token de acceso
    } catch (error) {
        // Error al refrescar el token (refresh token inválido o expirado)
        console.error("Error al refrescar token:", error);
        await setAccessToken(null); // Limpiar tokens al fallar refresh
        await setRefreshToken(null);
        // Aquí podrías redirigir al usuario a la pantalla de login
        return null;
    }
}

const getRequestConfig = async (method: string, payload?: any, requireAuth: boolean = true ): Promise<RequestInit> => {    
    if(requireAuth) accessToken = await getAccessToken()
    let config = {
        method: method,
        body: payload ? JSON.stringify(payload): '',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': requireAuth ? `Bearer ${accessToken}` : '',
        },
    }

    return config as RequestInit;
}

export const login = async (username: string, password: string) => {
    let headers = await getRequestConfig('POST', { username, password }, false )
    let response = await fetch(`${BASE_URL}token/`, headers);
    const { access, refresh } =  await response.json();
    await setAccessToken(access);
    await setRefreshToken(refresh);
    headers = await getRequestConfig('GET');
    response = await fetch(`${API_URL}profile/`, headers)
    const profileResponse = await response.json();
    const [ profile ] = profileResponse.results;
    return { ok: true, msg: 'user logged', profile }
}

export const apiRequest=async( method: string, url: string, data: any, requireAuth: boolean = true ): Promise<any>=>{
    let config = await getRequestConfig( method, data )
    try {
        const response = await fetch(BASE_URL+url, config);
        if( response.ok ) return await response.json();
        if( !response.ok && response.status === 401 && requireAuth){
            let accesToken = await refreshToken();
            if(accesToken){
                config = await getRequestConfig(method, data);
                return apiRequest(method, url, data, true);
            }else throw new Error('Session Expired')
        }
        throw new Error(response.statusText);
    } catch (error) {
        throw error
    }
}