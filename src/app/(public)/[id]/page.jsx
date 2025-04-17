"use client"
import { useEffect, useState } from "react";
import { Group } from "@/app/components/group";
import Link from "next/link";
import ToggleTheme from "@/app/components/toggleTheme";
import { Bio } from "@/app/components/bio";
import LoaderComponent from "@/app/components/loader";
export default function Page({ params }) {
    const [user, setUser] = useState(null)
    const [gruppi, setGruppi] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { id } = await params

            const res = await fetch("/api/get-user-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const data = await res.json()

            if (res.ok) {
                setUser(data.user)
                setGruppi(data.user.gruppi || [])
            }
        }

        fetchData()
    }, [params])

    if (!user || !user.email) return(
        <LoaderComponent/>
    )

    return (
        <div className="w-full flex justify-center">
            <div className='max-w-[550px] w-full flex flex-col gap-3 py-10 p-3 items-center justify-center text-black'>
                <div className="w-full flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</Link>
                    <ToggleTheme />
                </div>

                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <Bio data={user} />
                    {gruppi.map((data, index) => (
                        <Group data={data} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
