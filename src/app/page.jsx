"use client"
import { ArrowRight} from "lucide-react";
import { Funzionalita } from "./components/funzionalita";
import { motion } from "framer-motion";
import Link from "next/link";
import { Footer } from "./components/footer";

export default function Home() {

  return (
    <div className="w-full h-full">
        <div
          className="w-full h-84 flex flex-col items-center justify-center gap-5 px-3"
        >
        <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</p>
        <div className="max-w-[600px] w-full text-center">
          <p className="text-2xl text-gray-500">Una piattaforma semplice per raccogliere tutti i tuoi link in un unico posto accessibile</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link href="/register" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-400 px-4 py-2 rounded-lg text-sm text-white font-semibold">
            <p>Inizia ora</p>
            <ArrowRight size={15} />
          </Link>
          <Link href="/login" className="cursor-pointer hover:shadow-md flex gap-1 items-center border border-zinc-300 px-4 py-2 rounded-lg text-sm text-black font-semibold">
            <p>Accedi</p>
          </Link>
        </div>
      </div>


    <Funzionalita/>


      <div className="w-full flex flex-col items-center justify-center py-20 gap-5">
        <p className="text-3xl font-bold">Pronto a creare il tuo hub personale?</p>
        <div className="w-[600px] text-center">
          <p className="text-lg text-gray-500">Registrati gratuitamente oggi e inizia a raccogliere tutti i tuoi link in un unico posto facile da condividere</p>
        </div>
        <Link href="/register" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-400 px-4 py-2 rounded-lg text-sm text-white font-semibold">
            <p>Crea il tuo bio.it ora</p>
        </Link>
      </div>
      <Footer/>
    </div>
  );
}

