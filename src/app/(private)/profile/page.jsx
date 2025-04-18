"use client"
import { Plus} from "lucide-react";
import { useState } from "react";
import { ModalGroupComponent } from "@/app/components/group";
import LogOutComponent from "@/app/components/logOut";
import { BioPrivate } from "@/app/components/bio";
import GroupsCollector from "@/app/components/groupsCollector";
import { ModalLinkomponent } from "@/app/components/link";
import Nav from "@/app/components/nav";

export default function ProfielePage() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModal2, setIsOpenModal2] = useState(false)

    return (
        <div className="w-full flex justify-center">

            {/* modal */}
            {isOpenModal && <ModalGroupComponent
                closeModal={() => {
                    setIsOpenModal(false)
                }}
            />}
            {isOpenModal2 && <ModalLinkomponent
            idGruppo={isOpenModal2}
                closeModal={() => {
                    setIsOpenModal2()
                }}
            />}

            <div className='max-w-[550px] w-full flex flex-col gap-3 py-10 p-3 items-center justify-center text-black'>
                {/* logo e pulsanti sopra */}
                <Nav children={<LogOutComponent />}/>
                
                <div className="w-full flex flex-col gap-5 items-center justify-center">
                    {/* card bio */}
                    <BioPrivate/>
                    
                    {/* button per creare group */}
                    <button onClick={() => { setIsOpenModal(true) }} className="cursor-pointer hover:bg-purple-500 hover:border-purple-500 shadow-md flex gap-3 items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 w-full px-4 py-2 rounded-lg text-sm text-black dark:text-white font-semibold">
                        <Plus size={20} />
                        <p>Add New Group</p>
                    </button>

                    {/* lsita dinamica di gruppi */}
                    <GroupsCollector openModalFn={setIsOpenModal2}/>
                </div>
            </div>
        </div>
    );
}





