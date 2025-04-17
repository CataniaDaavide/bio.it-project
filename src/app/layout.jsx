import "./globals.css";

export const metadata = {
  title: "bio.it",
  description: "Progetto realizzato da davidecatania",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className="w-full h-full">
      <body
        className={`antialiased w-full h-full`}
      >
        {children}
      </body>
    </html>
  );
}
