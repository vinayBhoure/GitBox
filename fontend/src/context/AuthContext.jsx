import React, { createContext, useContext } from 'react';


export const AuthContext = createContext();

export const userAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try{
                const res = await fetch('/api/auth/check', {credentials: 'include'});
            const data = await res.json();
            setAuthUser(data.user);
            }catch(err){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        checkAuth();
    }, []);
        return (
            <AuthContext.Provider value={{ authUser, setAuthUser}}>
                {children}
            </AuthContext.Provider>
        )
}