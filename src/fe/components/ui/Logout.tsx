import React from "react";
import { FiUser } from "react-icons/fi"; // Usa una libreria di icone come react-icons (installalo con 'npm install react-icons')

interface LogoutProps {
  onLogout: () => void; // Callback per eseguire il logout
}

export const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center bg-zinc-800 p-3 rounded-full shadow-lg cursor-pointer hover:bg-zinc-700 transition-all">
      <FiUser className="text-white mr-2" size={22} />
      <button
        onClick={onLogout}
        className="text-sm font-semibold text-white"
      >
        Logout
      </button>
    </div>
  );
};