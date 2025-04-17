"use client"
import Link from "next/link"
import { useContext, useState } from "react"
import InputBox from "@/app/components/inputBox"
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", password2: "" })
    const [errore, setErrore] = useState("")
    const router = useRouter()
    const { user, setUser } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        e.preventDefault()
        setFormData(
            { ...formData, [name]: value }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.password || !formData.password2) {
            setErrore("Inserisci tutti i dati per completare la registrazione")
            return
        }

        if (formData.password != formData.password2) {
            setErrore("Le password non coincidono")
            return
        }

        setErrore("");
        try {
            const url = "/api/register"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };

            const res = await fetch(url, options)
            const data = await res.json()
            if (res.ok) {
                setUser(data.user)
                router.push("/profile")
            } else {
                setFormData({ name: "", email: "", password: "", password2: "" })
                setErrore(data.message || "Errore ddurante la registrazione")
            }
        }catch (error) {            
            setFormData({ name: "", email: "", password: "", password2: "" })
            setErrore("Si è verificato un errore imprevisto. Riprova più tardi.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[500px] w-full p-6 border border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col gap-5">
            <div>
                <p className="text-xl font-semibold">Registrati</p>
                <p className="text-sm text-gray-500">Crea un account per iniziare a gestire i tuoi link</p>
            </div>
            <InputBox data={{ title: "Nome", name: "name", type: "text", placeholder: "Il tuo nome", value: formData.name, fn: handleChange }} />
            <InputBox data={{ title: "Email", name: "email", type: "email", placeholder: "example@email.com", value: formData.email, fn: handleChange }} />
            <InputBox data={{ title: "Password", name: "password", type: "password", placeholder: "••••", value: formData.password, fn: handleChange }} />
            <InputBox data={{ title: "Conferma Password", name: "password2", type: "password", placeholder: "••••", value: formData.password2, fn: handleChange }} />
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