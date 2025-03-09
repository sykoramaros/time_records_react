import React, { createContext, useContext, useState, useEffect } from "react";

// Vytvoření kontextu
const UserContext = createContext();

// Hook pro snadné použití kontextu
export const useUser = () => useContext(UserContext);

// Poskytovatel kontextu
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = () => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            const parsedUser = JSON.parse(userJson);
            setUser({
                username: parsedUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || parsedUser.username,
                email: parsedUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || parsedUser.email,
                id: parsedUser.id || parsedUser["Id"],
                googleId: parsedUser.GoogleId,
                phoneNumber: parsedUser.PhoneNumber,
                monthTimeGoal: parsedUser.MonthTimeGoal,
            });
        }
    };

    useEffect(() => {
        updateUser();

        const handleStorageChange = (e) => {
            if (e.key === "user") {
                updateUser();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
