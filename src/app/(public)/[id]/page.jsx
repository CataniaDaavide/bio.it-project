"use client"
import { useEffect, useState } from "react";
import {GroupPublic } from "@/app/components/group";
import Nav from "@/app/components/nav";
import { BioPublic, BioSkeleton } from "@/app/components/bio";
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
            console.log(data);
            
            if (res.ok) {
                setUser(data.user)
                setGruppi(data.user.gruppi || [])
            }
        }

        fetchData()
    }, [params])

    if (!user || !user.email) return(
        <div className='max-w-[550px] self-center w-full flex flex-col gap-3 py-10 p-3 items-center justify-center text-black'>
                {/* logo e pulsanti sopra */}
                <Nav />
            <BioSkeleton/>
        </div>
    )

    return (
        <div className="w-full flex justify-center">
            <div className='max-w-[550px] w-full flex flex-col gap-3 py-10 p-3 items-center justify-center text-black'>
                
                {/* logo e pulsanti sopra */}
                <Nav />

                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    {/* card bio */}
                    <BioPublic data={user} />

                    {/* lista dinamica di gruppi */}
                    {gruppi.map((data, index) => (
                        <GroupPublic data={data} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
