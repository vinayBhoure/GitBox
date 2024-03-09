import React, { createContext, useContext } from 'react';
import {toast} from 'react-hot-toast';
import { useState, useEffect } from 'react';


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setLoading(true);
            try{
                const res = await fetch('/api/auth/check', {credentials: 'include'});
                const data = await res.json();
                setAuthUser(data.user);
                console.log("data -> ", data);
            }catch(err){
                toast.error(err.message);
            }finally{
                setLoading(false);
            }
        }
        checkUserLoggedIn();
    }, []);
        return (
            <AuthContext.Provider value={{authUser, setAuthUser, loading}}>
                {children}
            </AuthContext.Provider>
        )
}