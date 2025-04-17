/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // nomi personalizzati
        secondary: {
          light: '#cccccc', // zinc-400
          dark: '#3f3f46',  // zinc-700
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
