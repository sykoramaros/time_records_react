import axios from "axios"
// 3.
// const baseURL = "http://localhost:5113/api/GoogleAccount"
// const baseURL = "https://localhost:7081/api/GoogleAccount"
const baseURL = "https://recordsapi.runasp.net/api/GoogleAccount"

const TOKEN_KEY = 'auth_token';
const EXPIRATION_KEY = 'auth_expiration';
const USER_KEY = 'auth_user';

export const authService = {  // 3.
  async googleLogin(idToken) {
    try {
      console.log("Odesílám požadavek na server s idToken:", idToken.substring(0, 10) + "...");

      const response = await axios.post(`${baseURL}/GoogleLogin`, {
        idToken,
      })

      console.log("Odpověď ze serveru:", response);
      console.log("Data z odpovědi:", response.data);

      if (!response.data.token || !response.data.expiration) {
        console.error("Server nevrátil očekávaná data (token nebo expiration):", response.data);
        throw new Error("Neplatná odpověď ze serveru");
      }
      
      const authData = {
        token: response.data.token,
        expiration: new Date(response.data.expiration),
      }

      console.log("Zpracovaná autentizační data:", authData);
      
      // Uložení do local storage
      localStorage.setItem(TOKEN_KEY, authData.token);
      localStorage.setItem(EXPIRATION_KEY, authData.expiration.toISOString());
      
      // 🐿️ DESERIALIZACE JWT DAT Z BACKENDU do klice "user"
      const userData = this.parseJwt(authData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Deserializovana data z backendu: ", userData)
      
      return authData;
    } catch (error) {
      console.error("An error occured during Google login:", error)
      throw new Error(
        error.response?.data?.message || "Google login error appeared"
      )
    }
  },
  
  // Pomocná metoda pro dekódování JWT tokenu
  parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  },
  
  // Získání tokenu z local storage
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  // Získání uživatelských dat z local storage
  getUser() {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  
  // Kontrola, zda je uživatel přihlášen a token je stále platný
  isAuthenticated() {
    const token = this.getToken();
    const expirationStr = localStorage.getItem(EXPIRATION_KEY);
    
    if (!token || !expirationStr) {
      return false;
    }
    
    const expiration = new Date(expirationStr);
    return expiration > new Date();
  },
  
  // Odhlášení - vymazání dat z local storage
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// import axios from "axios"

// // const baseURL = "http://localhost:5113/api/GoogleAccount"
// // const baseURL = "https://localhost:7081/api/GoogleAccount"
// const baseURL = "https://recordsapi.runasp.net/api/GoogleAccount"

// export const authService = {
//   async googleLogin(idToken) {
//     try {
//       const response = await axios.post(`${baseURL}/GoogleLogin`, {
//         idToken,
//       })
//       console.log(response.data)
//       return {
//         token: response.data.token,
//         expiration: new Date(response.data.expiration),
//       }
//     } catch (error) {
//       console.error("An error occured during Google login:", error)
//       throw new Error(
//         error.response?.data?.message || "Google login error appeared"
//       )
//     }
//   },
// }
