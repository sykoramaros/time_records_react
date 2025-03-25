import axios from "axios";
import { jwtDecode } from "jwt-decode";

// API endpoint - vyberte si jednu z možností a ostatní zakomentujte
// const baseURL = "http://localhost:5113/api/GoogleAccount";
// const baseURL = "https://localhost:7081/api/GoogleAccount";
const baseURL = "https://recordsapi.runasp.net/api/GoogleAccount";

/**
 * Odešle Google credentials na backend API a uloží token do localStorage
 * @param {string} googleCredential - Google credential token
 * @returns {Promise} Promise s odpovědí API
 */
export const sendGoogleCredentialToApi = async (googleCredential) => {
    if (!googleCredential) {
        console.error("Error: googleCredential je prázdný");
        throw new Error("GoogleCredential je prázdný");
    }
    // console.log("Odesílám Google credential:", googleCredential);
    try {
        const response = await axios.post(`${baseURL}/GoogleLogin`, {
            googleLoginToken: googleCredential
        });
        if (!response || !response.data) {
            console.error("Error: Prázdná odpověď ze serveru");
            throw new Error("Prázdná odpověď ze serveru");
        }
        // console.log("Odpověď z API:", response);
        // Předpokládáme, že token je v response.data.token
        if (response.data.token) {
            localStorage.setItem("googleUserToken", response.data.token);
            // console.log("Token uložen do localStorage:", response.data.token);
        } else {
            console.warn("Varování: Token nebyl v odpovědi nalezen, ukládám celou odpověď");
            localStorage.setItem("googleUserData", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error("Chyba při komunikaci s API:", error);
        throw error;
    }
};

/**
 * Získá informace o uživateli z Google tokenu uloženého v localStorage
 * @returns {Object|null} Dekódovaný token nebo null v případě chyby
 */
export const getUserFromToken = (token) => {
    // Nejprve zkusíme najít token
    // const token = localStorage.getItem("googleUserToken");
    if (!token) {
        console.error("getDecodedToken: return null.");
        return null
    }
    try {
        const decodedToken = jwtDecode(token);
        // console.log("getUserFromToken:", decodedToken);
        // console.log("getUserFromToken exp:", decodedToken.exp);
        // console.log("getUserFromToken name:", decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
        // console.log("getUserFromToken email:", decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
        // console.log("getUserFromToken id:", decodedToken.Id);
        // console.log("getUserFromToken GoogleId:", decodedToken.GoogleId);
        // console.log("getUserFromToken PhoneNumber:", decodedToken.PhoneNumber);
        // console.log("getUserFromToken MonthTimeGoal:", decodedToken.MonthTimeGoal);
        // console.log(Object.keys(decodedToken));
        return {
            id: decodedToken.id || decodedToken.Id,
            googleId: decodedToken.googleId || decodedToken.GoogleId,
            userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            phoneNumber: decodedToken.phoneNumber || decodedToken.PhoneNumber,
            monthTimeGoal: decodedToken.monthTimeGoal || decodedToken.MonthTimeGoal
        };
    } catch (error) {
        console.error("Chyba při dekódování tokenu:", error);
        return null
    }
};

export const getUserFromLocalStorage = () => {
    // Nejprve zkusíme najít token
    const token = localStorage.getItem("googleUserData");
    if (token) {
        try {
            return getUserFromToken(token);
        } catch (error) {
            console.error("Chyba při dekódování tokenu z localStorage:", error);
        }
    }
    // Pokud token neexistuje nebo je neplatný, zkusíme najít userData
    const userData = localStorage.getItem("googleUserData.googleLoginToken");
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error("Chyba při načítání uživatelských dat:", error);
        }
    }
    return null;
};

/**
 * Odhlásí uživatele odstraněním tokenu z localStorage
 */
export const logoutUser = () => {
    localStorage.clear();
    // localStorage.removeItem("googleUserToken");
    // localStorage.removeItem("googleUserData");
    console.log("Uživatel byl odhlášen");
};
/**
 * Zkontroluje, zda je uživatel přihlášen
 * @returns {boolean} True pokud je uživatel přihlášen
 */
export const isUserLoggedIn = () => {
    return getUserFromToken() !== null;
};