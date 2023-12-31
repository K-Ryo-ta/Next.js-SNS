import apiClient from '@/lib/apiClient';
import React, { ReactNode, useContext, useEffect } from 'react';

interface AuthContextType {
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const Authcontext = React.createContext<AuthContextType>({
    login: () => { },
    logout: () => { },
});

export const useAuth = () => {
    return useContext(Authcontext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    }, []);

    const login = async (token: string) => {
        localStorage.setItem("auth_token", token);
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
    };

    const value = {
        login,
        logout,
    };

    return (
        <Authcontext.Provider value={value}>
            {children}
        </Authcontext.Provider>
    );

};
