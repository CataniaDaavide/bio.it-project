import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { Footer } from "./components/footer";
import { UserProvider } from "./context/UserContext";
export const metadata = {
  title: "bio.it",
  description: "Progetto realizzato da davidecatania",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="w-full h-full text-black dark:text-white bg-white dark:bg-zinc-900">
        <UserProvider>
        <ThemeProvider>
          <div className="w-full flex flex-col justify-between">
          {children}
          <Footer/>
          </div>
        </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
