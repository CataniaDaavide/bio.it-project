"use client"
import ToggleTheme from "@/app/components/toggleTheme";
import { Plus, X, LogOut, Pen, Check } from "lucide-react";
import { useState } from "react";
import { Group, ModalGroupComponent } from "@/app/components/group";
export default function ProfielePage() {
    const [isOpen, setIsOpen] = useState(false)
    const [gruppi, setGruppi] = useState([
        {
            "title": "Social Media",
            "links": [
                {
                    "name": "Instagram",
                    "value": "www.google.it",
                },
                {
                    "name": "TikTok",
                    "value": "www.google.it",
                },
                {
                    "name": "FaceBook",
                    "value": "www.google.it",
                },
            ]
        }
    ])

    return (
        <div className="w-full flex justify-center">
            {isOpen && <ModalGroupComponent
                data={gruppi}
                setData={setGruppi}
                closeModal={() => {
                    setIsOpen(false)
                }}
            />}

            <div className='max-w-[400px] w-full flex flex-col gap-3 py-20 items-center justify-center text-black'>


                <div className="w-full flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</p>

                    {/* pulsanti */}
                    <div className="flex gap-1">
                        <ToggleTheme />
                        <LogOutComponent />
                    </div>
                </div>
                <p className="text-lg text-gray-500">Your personal link hub</p>


                <div className="w-full flex flex-col gap-3 items-center justify-center">

                    <Bio />


                    {/* button per creare group */}
                    <button onClick={() => { setIsOpen(true) }} className="cursor-pointer hover:bg-purple-500/20 shadow-md flex gap-3 items-center justify-center border border-dashed border-zinc-300 w-full px-4 py-2 rounded-lg text-sm text-black font-semibold">
                        <Plus size={20} />
                        <p>Add New Group</p>
                    </button>


                    {/* lsita dinamica di group */}
                    {gruppi.map((data, index) => {
                        return <Group data={data} edit={true} key={index}
                            onDeleteGroup={() => {
                                const newGruppi = [...gruppi];
                                newGruppi.splice(index, 1); // rimuovi il gruppo in posizione `index`
                                setGruppi(newGruppi);
                            }}
                        />
                    })}
                </div>
            </div>
        </div>
    );
}





function Modal({ closeModal }) {

    return (
        <div className="absolute bg-black/70 w-screen h-screen border flex items-center justify-center">
            <div className="max-w-[400px] w-full h-96 border border-zinc-300 bg-white rounded-lg p-3">
                <div className="w-full flex items-center justify-between">
                    <p className="font-bold">Add new link</p>
                    <X onClick={closeModal} />
                </div>

                <div>
                    <div className="text-sm font-semibold">
                        <p>Title</p>
                        <input type="text" name="title" placeholder="My Website" className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
                    </div>
                    <div className="text-sm font-semibold">
                        <p>URL</p>
                        <input type="text" name="link" placeholder="http://example.com" className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}




function LogOutComponent() {
    return (
        <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20 text-purple-700">
            <LogOut />
        </div>
    )
}

function Bio() {
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState({ name: "Davide", avatar: "https://imgur.com/Vkju7NJ.png", description: "Welcome to my bio.it page! Here you'll find all my importatn linksada." })
    const [newUser, setNewUser] = useState(user)

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    const hadleConfirm = (e) => {
        e.preventDefault()
        setUser(newUser)
        setIsEdit(false)
    }
    const hadleNotConfirm = (e) => {
        e.preventDefault()
        setNewUser(user)
        setIsEdit(false)
    }

    return (
        <div className="relative flex flex-col gap-3 items-center text-center justify-center w-full p-3 rounded-lg border border-zinc-300 shadow-md">
            {user.avatar
                ?
                <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                :
                <div className="bg-purple-500/20 w-24 h-24 p-3 rounded-full flex items-center justify-center text-purple-700">
                    <p className="text-3xl">{user.name.charAt(0).toUpperCase()}</p>
                </div>
            }
            {
                isEdit
                    ?
                    <>
                        <input onChange={handleChange} type="text" name="avatar" placeholder={"Avatar URL"} value={newUser.avatar} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
                        <input onChange={handleChange} type="text" name="name" placeholder={"Your name"} value={newUser.name} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
                        <textarea onChange={handleChange} name="description" placeholder={"Your bio"} value={newUser.description} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
                    </>
                    :
                    <>
                        <p className="text-2xl font-bold">{user.name}</p>
                        <p className="text-md text-gray-500">{user.description}</p>
                    </>
            }

            <div className="absolute top-3 right-3 flex">
                {
                    isEdit
                        ?
                        <>
                            <div onClick={hadleConfirm} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                                <Check />
                            </div>
                            <div onClick={hadleNotConfirm} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                                <X />
                            </div>
                        </>
                        :
                        <div onClick={() => { setIsEdit(true) }} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20 text-purple-700">
                            <Pen />
                        </div>
                }
            </div>
        </div>

    )
}