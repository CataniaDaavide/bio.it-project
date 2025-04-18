"use client"
import { ArrowRight } from "lucide-react";
import { Funzionalita } from "./components/funzionalita";
import Link from "next/link";
import ToggleTheme from "./components/toggleTheme";
import { AvatarComponent } from "./components/avatarComponent";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

export default function Home() {
  const {user,setUser} = useContext(UserContext)
  return (
    <div className="w-full">
      <div className="absolute top-3 right-3 flex gap-1 items-center">
        <ToggleTheme />
        {user && <AvatarComponent data={user} />}
      </div>

      {/* div1 */}
      <div className="w-full h-84 flex flex-col items-center justify-center gap-5 px-3">
        <Link href="/" className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</Link>
        <div className="max-w-[600px] w-full text-center">
          <p className="text-2xl text-gray-500">Una piattaforma semplice per raccogliere tutti i tuoi link in un unico posto accessibile</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link href="/register" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-500 hover:bg-purple-500/80 transition-all delay-200 ease-in-out px-4 py-2 rounded-lg text-sm text-white font-bold">
            <p>Inizia ora</p>
            <ArrowRight size={15} />
          </Link>
          <Link href="/login" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 hover:dark:bg-zinc-200 text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold">
            <p>Accedi</p>
          </Link>
        </div>
      </div>

      {/* div2 */}
      <Funzionalita />

      {/* div3 */}
      <div className="w-full flex flex-col items-center justify-center py-20 gap-5">
        <p className="text-3xl font-bold">Pronto a creare il tuo hub personale?</p>
        <div className="w-[600px] text-center">
          <p className="text-lg text-gray-500">Registrati gratuitamente oggi e inizia a raccogliere tutti i tuoi link in un unico posto facile da condividere</p>
        </div>
        <Link href="/register" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-500 hover:bg-purple-500/80 px-4 py-2 rounded-lg text-sm text-white font-semibold">
          <p>Crea il tuo bio.it ora</p>
        </Link>
      </div>
    </div>
  );
}


