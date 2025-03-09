// import React from "react"
// // import { useEffect, useRef } from "react"
// // 1.
// import { GoogleLogin } from "@react-oauth/google"
// // import { useAuth } from "../../Services/GoogleAuthService/GoogleAuthService" // Import AuthProvider hook
// import { useAuth } from "../../Services/AuthService/AuthService"
// // Nezapomeňte přidat React Google Login knihovnu:
// // npm install @react-oauth/google
//
// export const GoogleLoginButton = ({ onSuccess, onError }) => {
//   const { loginWithGoogle, loading } = useAuth()
//
//   const handleSuccess = async (response) => {
//     try {
//       console.log("Google response:", response);
//       // Získáme id_token z Google odpovědi
//       const idToken = response.credential
//
//       if (!idToken) {
//         throw new Error("Google neposkytl ID token")
//       }
//
//       await loginWithGoogle(idToken) // 1.
//       console.log("Google login successful", idToken)
//       onSuccess?.()
//     } catch (error) {
//       console.error("Chyba při přihlášení:", error)
//       onError?.(error instanceof Error ? error.message : "Neznámá chyba")
//     }
//   }
//
//   const handleError = () => {
//     const errorMessage = "Google login failed"
//     console.error(errorMessage)
//     onError?.(errorMessage)
//   }
//
//   return (
//     <div className="google-login-container"
//           >
//       {loading ? (
//         <div>Načítání...</div>
//       ) : (
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           useOneTap
//         />
//       )}
//     </div>
//   )
// }

import React from 'react';
// Import Google login hook
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../Services/AuthService/AuthService'; // Import AuthProvider hook
import './GoogleLoginButton.css';

export const GoogleLoginButton = ({ onSuccess, onError }) => {
  const { loginWithGoogle, loading } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log('Google response:', response);
        // const idToken = response.credential;
        const idToken = response.access_token;

        if (!idToken) {
          throw new Error('Google neposkytl ID token');
        }

        await loginWithGoogle(idToken);
        console.log('Google login successful', idToken);
        onSuccess?.();
      } catch (error) {
        console.error('Chyba při přihlášení:', error);
        onError?.(error instanceof Error ? error.message : 'Neznámá chyba');
      }
    },
    onError: () => {
      const errorMessage = 'Google login failed';
      console.error(errorMessage);
      onError?.(errorMessage);
    },
  });

  return (
      <div>
        {loading ? (
            <div>Načítání...</div>
        ) : (
            <a className="google-login-container" onClick={() => login()} type="button">
            <img width={30} height={30}  src={`${process.env.PUBLIC_URL}/Photos/google-login.svg`} alt="Google login" />
            </a>
        )}
      </div>
  );
};
