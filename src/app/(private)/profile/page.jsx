"use client"
import ToggleTheme from "@/app/components/toggleTheme";
import { Plus} from "lucide-react";
import { useEffect, useContext, useState } from "react";
import { Group, ModalGroupComponent } from "@/app/components/group";
import Link from "next/link";
import LogOutComponent from "@/app/components/logOut";
import { BioPrivate } from "@/app/components/bio";
import { UserContext } from "@/app/context/UserContext";
import LoaderComponent from "@/app/components/loader";
import GroupsCollector from "@/app/components/groupsCollector";
import { ModalLinkomponent } from "@/app/components/link";

export default function ProfielePage() {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <div className="w-full flex justify-center">
            {isOpenModal && <ModalGroupComponent
                closeModal={() => {
                    setIsOpenModal(false)
                }}
            />}

            <div className='max-w-[550px] w-full flex flex-col gap-3 py-10 p-3 items-center justify-center text-black'>

                <div className="w-full flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</Link>

                    {/* pulsanti */}
                    <div className="flex gap-1">
                        <ToggleTheme />
                        <LogOutComponent />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5 items-center justify-center">
                    <BioPrivate/>
                    
                    {/* button per creare group */}
                    <button onClick={() => { setIsOpenModal(true) }} className="cursor-pointer hover:bg-purple-500 hover:border-purple-500 shadow-md flex gap-3 items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 w-full px-4 py-2 rounded-lg text-sm text-black dark:text-white font-semibold">
                        <Plus size={20} />
                        <p>Add New Group</p>
                    </button>

                    {/* lsita dinamica di group */}
                    <GroupsCollector />
                </div>
            </div>
        </div>
    );
}





