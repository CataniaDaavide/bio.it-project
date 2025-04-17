"use client"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogOutComponent() {
    const router = useRouter()
    const handleLogOut = async () => {
        const url = "/api/log-out"
        const res = await fetch(url)
        if(res.ok){
            router.push("/login")
        }
    }

    return (
        <div onClick={handleLogOut}className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20 text-purple-700">
            <LogOut />
        </div>
    )
}