import React, { createContext, useState, useContext, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const secretKey = 'nambndpx7'; 
const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                return decryptData(savedUser);
            } catch (error) {
                console.error('Error decrypting user from localStorage', error);
                localStorage.removeItem('user');
            }
        }
        return null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', encryptData(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
