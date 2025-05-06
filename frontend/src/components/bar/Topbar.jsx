import React, { useState } from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="p-3.5 bg-white shadow-md font-serif text-lg font-semibold flex items-center justify-between">
      <div className="flex-1 text-gray-800">Messenger</div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          className="border-none hover:bg-gray-100"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun className="items-center" size={18} />
          ) : (
            <Moon className="items-center" size={18} />
          )}
        </Button>

        <Button variant="outline" className="border-none hover:bg-gray-100">
          <MdSettings className="items-center" size={18} />
        </Button>
        <Button
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => navigate("/home")}
        >
          <MdLogout className="items-center" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
