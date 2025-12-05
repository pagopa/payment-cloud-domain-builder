import React from "react";
import { FiUser } from "react-icons/fi";

interface LogoutProps {
  onLogout: () => void;
}

export const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center bg-zinc-100  p-3 rounded-full shadow-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:bg-zinc-700 transition-all">
      <FiUser className="text-white mr-2" size={22} />
      <button
        onClick={onLogout}
        className="text-sm font-semibold text-zinc-700 dark:text-white"
      >
        Logout
      </button>
    </div>
  );
};