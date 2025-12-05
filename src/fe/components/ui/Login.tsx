import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

interface UserProfile {
  name: string;
  email: string;
  imageUrl: string;
}

interface GoogleCredentialResponse {
  credential?: string;
  select_by?: string;
  clientId?: string;
}

export const Login: React.FC<{ onLoginSuccess: (profile?: UserProfile) => void }> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const decodeJWT = (token: string): UserProfile | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
          atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
      );
      const payload = JSON.parse(jsonPayload);

      return {
        name: payload.name || '',
        email: payload.email || '',
        imageUrl: payload.picture || ''
      };
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      return null;
    }
  };

  const handleFakeLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    if (username === "admin" && password === adminPassword) {
      setError("");
      onLoginSuccess({
        name: username,
        email: `${username}@local.dev`,
        imageUrl: ''
      });
    } else {
      setError("Credenziali non valide. Riprova.");
      }
    };


  const handleGoogleLoginSuccess = (credentialResponse: GoogleCredentialResponse) => {
    if (credentialResponse.credential) {
      const profile = decodeJWT(credentialResponse.credential);
      onLoginSuccess(profile || undefined);
    } else {
      onLoginSuccess();
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google Login Failed");
    setError("Login con Google fallito. Riprova.");
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex items-center justify-center min-h-screen from-gray-900 via-black to-zinc-900">
        <div className="bg-zinc-100 dark:bg-zinc-100 dark:bg-zinc-800 text-white shadow-md rounded-2xl p-8 w-full max-w-md">

          {/* Header Personalizzato per IDH */}
          <header className="mb-8 text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 text-transparent bg-clip-text font-extrabold text-4xl drop-shadow-lg">
              IDH Platform Login
            </div>
            <p className="text-zinc-800 dark:text-zinc-400 text-sm mt-2">
              Accedi per configurare facilmente domini e infrastrutture IDH.
            </p>
          </header>



          {/* Modulo di login manuale */}
          <form onSubmit={handleFakeLogin} className="space-y-4">
            <div className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg">
              <FiUser className="text-indigo-500 mr-3" size={20} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-zinc-900 dark:text-white text-sm outline-none placeholder:text-zinc-500 placeholder:italic"
              />
            </div>
            <div className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg">
              <MdLockOutline className="text-indigo-500 mr-3" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-zinc-900 dark:text-white text-sm outline-none placeholder:text-zinc-500 placeholder:italic"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit" // Il tasto Invio ora attiverà questo bottone
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all"
            >
              Login
            </button>
          </form>

          <div className="my-6 border-t border-zinc-300 dark:border-zinc-700"></div>

          {/* Login con Google */}
          <div className="text-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};