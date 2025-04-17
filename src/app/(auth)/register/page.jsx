"use client"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
    const [formData, setFormData] = useState({name:"", email:"",password:"",password2:""})
    const [errore,setErrore] = useState("")

    const handleChange = (e) => {
        const {name, value} = e.target
        e.preventDefault()
        setFormData(
            {...formData,[name]:value}
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!formData.name || !formData.email || !formData.password || !formData.password2){
            setErrore("Inserisci tutti i dati per completare la registrazione")
            return
        }

        if(formData.password != formData.password2){
            setErrore("Le password non coincidono")
            return
        }

        const url = "/api/register"
        const options = {}
        const res = await fetch(url, options)
        if(res.ok){
            const data = await res.json()
            console.log(res,data);
            
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[500px] w-full p-6 border border-zinc-300 rounded-xl flex flex-col gap-5">
            <div>
                <p className="text-xl font-semibold">Registrati</p>
                <p className="text-sm text-gray-500">Crea un account per iniziare a gestire i tuoi link</p>
            </div>
            <div className="text-sm font-semibold">
                <p>Nome</p>
                <input onChange={handleChange} type="text" name="name" placeholder="Il tuo nome" value={formData.name} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
            </div>
            <div className="text-sm font-semibold">
                <p>Email</p>
                <input onChange={handleChange} type="email" name="email" placeholder="example@email.com" value={formData.email} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
            </div>
            <div className="text-sm font-semibold">
                <p>Password</p>
                <input onChange={handleChange} type="password" name="password" placeholder="••••" value={formData.password} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
            </div>
            <div className="text-sm font-semibold">
                <p>Conferma Password</p>
                <input onChange={handleChange} type="password" name="password2" placeholder="••••" value={formData.password2} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
            </div>
            {errore && <p className="text-red-500">{errore}</p>}
            <button type="submit" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-400 px-4 py-2 rounded-lg text-sm text-white font-semibold justify-center">
                <p>Registrati</p>
            </button>

            <div className="flex gap-1 w-full items-center justify-center">
                <p>Hai già un account?</p>
                <Link href="/login" className="text-purple-400 underline cursor-pointer">Accedi</Link>
            </div>
        </form>
    )
} 