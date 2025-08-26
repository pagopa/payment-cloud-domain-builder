import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FiUser } from "react-icons/fi"; // Icona utente
import { MdLockOutline } from "react-icons/md"; // Icona di blocco per password

const clientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; // Sostituisci con il tuo Client ID

export const Login: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Funzione per gestire il login "fake" tramite credenziali admin
  const handleFakeLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene il comportamento predefinito del form (refresh della pagina)
    if (username === "admin" && password === "admin") {
      setError("");
      onLoginSuccess(); // Chiamata alla funzione di successo del login
    } else {
      setError("Credenziali non valide. Riprova.");
    }
  };

  const handleGoogleLoginSuccess = () => {
    onLoginSuccess(); // Gestisci il successo di login tramite Google
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex items-center justify-center min-h-screen from-gray-900 via-black to-zinc-900">
        <div className="bg-zinc-800 text-white shadow-md rounded-2xl p-8 w-full max-w-md">

          {/* Header Personalizzato per IDH */}
          <header className="mb-8 text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 text-transparent bg-clip-text font-extrabold text-4xl drop-shadow-lg">
              IDH Platform Login
            </div>
            <p className="text-zinc-400 text-sm mt-2">
              Accedi per configurare facilmente domini e infrastrutture IDH.
            </p>
          </header>



          {/* Modulo di login manuale */}
          <form onSubmit={handleFakeLogin} className="space-y-4">
            <div className="flex items-center bg-zinc-900 border border-zinc-700 p-3 rounded-lg">
              <FiUser className="text-indigo-500 mr-3" size={20} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none placeholder:text-zinc-500 placeholder:italic"
              />
            </div>
            <div className="flex items-center bg-zinc-900 border border-zinc-700 p-3 rounded-lg">
              <MdLockOutline className="text-indigo-500 mr-3" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none placeholder:text-zinc-500 placeholder:italic"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit" // Il tasto Invio ora attiverà questo bottone
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all"
            >
              Login come Admin
            </button>
          </form>

          <div className="my-6 border-t border-zinc-700"></div>

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