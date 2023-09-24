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
    return React.useContext(Authcontext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const token = localStorage.getItem("auth_token");

    useEffect(() => {
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
