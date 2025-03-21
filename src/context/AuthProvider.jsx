'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext'; // Importação nomeada correta
import Loader from '../components/Loader';
import app from '../firebase/firebase';

const auth = getAuth(app);

export const AuthContextProvider = ({ children }) => { // Adicione chaves ao children
    const [userAuth, setUserAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserAuth(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    async function logout() {
        try {
            await signOut(auth);
            return { result: true, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    return (
        <AuthContext.Provider value={{ userAuth, logout }}>
            {loading ? (
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};