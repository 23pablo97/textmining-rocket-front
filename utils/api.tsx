import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_URL_API as string;

interface LoginResponse {
    user: any;
    access_token: string;
    refresh_token: string;
}

export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/login`, { username, password });
        const { user, access_token, refresh_token } = response.data;
        Cookies.set('user', JSON.stringify(user));
        Cookies.set('access_token', access_token);
        Cookies.set('refresh_token', refresh_token);
        return true;
    } catch (error) {
        console.error('Login error', error);
        return false;
    }
}

export const getAccessToken = (): string | null => {
    const token = Cookies.get('access_token');
    return token !== undefined ? token : null;
};

export const getRefreshToken = (): string | null => {
    const token = Cookies.get('refresh_token');
    return token !== undefined ? token : null;
};

export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const refreshToken = getRefreshToken();
        const response: AxiosResponse<{ access_token: string }> = await axios.post(`${API_URL}/refresh`, {}, {
            headers: { Authorization: `Bearer ${refreshToken}` },
        });
        const { access_token } = response.data;
        Cookies.set('access_token', access_token);
        return access_token;
    } catch (error) {
        console.error('Error refreshing access token', error);
        return null;
    }
};

export const logout = async (): Promise<void> => {
    try {
        const token = getAccessToken();
        await axios.post(`${API_URL}/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Logout error', error);
    } finally {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user');
    }
};

export const authenticatedRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, data: any = null): Promise<AxiosResponse<any>> => {
    try {
        let token = getAccessToken();
        let headers = { Authorization: `Bearer ${token}` };

        try {
            const response: AxiosResponse<any> = await axios({ method, url: `${API_URL}${url}`, headers, data });
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    headers = { Authorization: `Bearer ${newToken}` };
                    const response: AxiosResponse<any> = await axios({ method, url: `${API_URL}${url}`, headers, data });
                    return response;
                } else {
                    await logout();
                    throw new Error('Session expired, please log in again.');
                }
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Authenticated request error', error);
        throw error;
    }
};

export const authenticatedRequestDownload = async (url: string, data: any = null): Promise<AxiosResponse<any>> => {
    try {
        let token = getAccessToken();
        let headers = { Authorization: `Bearer ${token}` };

        try {
            const response: AxiosResponse<any> = await axios({ method: "get", url: `${API_URL}${url}`, responseType: "blob", headers, data });
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    headers = { Authorization: `Bearer ${newToken}` };
                    const response: AxiosResponse<any> = await axios({ method: "get", url: `${API_URL}${url}`, responseType: "blob", headers, data });
                    return response;
                } else {
                    await logout();
                    throw new Error('Session expired, please log in again.');
                }
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Authenticated request error', error);
        throw error;
    }
};
