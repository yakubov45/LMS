"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Theme from localStorage
        const savedTheme = localStorage.getItem('campus_theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }

        // Firebase Auth listener
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch the role from Firestore
                try {
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({ id: firebaseUser.uid, email: firebaseUser.email, ...userData });
                        setRole(userData.role || 'student');
                    } else {
                        // Keep a minimal profile if no doc exists yet
                        setUser({ id: firebaseUser.uid, email: firebaseUser.email });
                        setRole('student');
                    }
                } catch (err) {
                    console.error("Error fetching user role:", err);
                    setUser({ id: firebaseUser.uid, email: firebaseUser.email });
                    setRole('student');
                }
            } else {
                setUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleDarkMode = () => {
        const nextMode = !isDarkMode;
        setIsDarkMode(nextMode);
        if (nextMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('campus_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('campus_theme', 'light');
        }
    };

    /**
     * Now login logic is managed by Firebase Sign In in `page.js`.
     * We just provide a fallback logout mechanism here.
     */
    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            setRole(null);
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    return (
        <UserContext.Provider value={{ user, role, logout, loading, isDarkMode, toggleDarkMode }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
