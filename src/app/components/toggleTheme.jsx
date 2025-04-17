"use client"
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ToggleTheme() {
  const [theme, setTheme] = useState("ligth")

  return (
    <div className='text-purple-700'>
      {
        theme === "ligth"
          ?
          <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20" onClick={() => {setTheme("dark")}}>
          <Sun />
         </div>
     
          :
          <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20" onClick={() => {setTheme("ligth")}}>
          <Moon />
         </div>
      }
    </div>
  );
}

