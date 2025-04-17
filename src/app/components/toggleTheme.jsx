"use client"
import { Sun, Moon } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ButtonIcon from './buttonIcon';

export default function ToggleTheme() {
  const {theme,setTheme} = useContext(ThemeContext)

  return (
    <div>
      {
        theme === "ligth"
          ?

          <ButtonIcon icon={<Sun />} fn={() => {setTheme("dark")}} />     
          :
          <ButtonIcon icon={<Moon />} fn={() => {setTheme("ligth")}} />     
      }
    </div>
  );
}

