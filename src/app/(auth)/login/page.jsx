"use client"
import Link from "next/link"
import { useContext, useState } from "react"
import InputBox from "@/app/components/inputBox"
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";

export default function LoginPage() {
    const [formData, setFormData] = useState({email:"",password:""})
    const [errore,setErrore] = useState("")
    const router = useRouter()
    const {user, setUser} = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        e.preventDefault()
        setFormData(
            {...formData,[name]:value}
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!formData.email || !formData.password){
            setErrore("Inserisci tutti i dati per completare la registrazione")
            return
        }

        setErrore("");

        try {
            const url = `/api/login`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };

            const response = await fetch(url, options);
            
            if (response.ok) {
                const data = await response.json()                
                setUser(data.user)
                router.push("/profile");
            } else {
                const data = await response.json();                
                setErrore(data.message || "Errore nel login");
            }
        } catch (error) {
            setErrore("Si è verificato un errore imprevisto. Riprova più tardi.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[500px] w-full p-6 border border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col gap-5">
            <div>
                <p className="text-xl font-semibold">Accedi</p>
                <p className="text-sm text-gray-500">Inserisci i tuoi dati di accesso per continuare</p>
            </div>
            <InputBox data={{title:"Email",name:"email", type:"email", placeholder:"example@email.com", value:formData.email, fn:handleChange}}/>
            <InputBox data={{title:"Password",name:"password", type:"password", placeholder:"••••", value:formData.password, fn:handleChange}}/>
            {errore && <p className="text-red-500">{errore}</p>}
            <button type="submit" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-500 hover:bg-purple-500/80 px-4 py-2 rounded-lg text-sm text-white font-semibold justify-center">
                <p>Accedi</p>
            </button>

            <div className="flex gap-1 w-full items-center justify-center">
                <p>Non hai un account?</p>
                <Link href="/register" className="text-purple-400 underline cursor-pointer">Registrati</Link>
            </div>
        </form>
    )
} 