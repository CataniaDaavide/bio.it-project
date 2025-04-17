import Link from "next/link"

export default async function RegisterPage() {
    return (
        <form action="submit" className="max-w-[500px] w-full p-6 border border-zinc-300 rounded-xl flex flex-col gap-5">
            <div>
                <p className="text-xl font-semibold">Accedi</p>
                <p className="text-sm text-gray-500">Inserisci i tuoi dati di accesso per continuare</p>
            </div>
            <div className="text-sm font-semibold">
                <p>Email</p>
                <input type="email" name="email" placeholder="example@email.com" className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
            </div>
            <div className="text-sm font-semibold">
                <p>Password</p>
                <input type="password" name="password" placeholder="••••" className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
            </div>

            <button type="submit" className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-400 px-4 py-2 rounded-lg text-sm text-white font-semibold justify-center">
                <p>Accedi</p>
            </button>

            <div className="flex gap-1 w-full items-center justify-center">
                <p>Non hai un account?</p>
                <Link href="/register" className="text-purple-400 underline cursor-pointer">Registrati</Link>
            </div>
        </form>
    )
} 