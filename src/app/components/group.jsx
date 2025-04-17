"use client"
import { useState } from "react";
import { Plus, Pen, X, Trash2, Check } from "lucide-react";
import { LinkGroup } from "./link";

export function Group({ data, edit, onDeleteGroup }) {
    const [titleChange, setTitleChange] = useState(false)
    const [title, setTitle] = useState(data.title)
    const [newTitle, setNewTitle] = useState(title)

    const handleChange = (e) => {
        e.preventDefault()
        setNewTitle(e.target.value)
    }
    const hadleConfirm = (e) => {
        e.preventDefault()
        setTitle(newTitle)
        setTitleChange(false)
    }
    const hadleNotConfirm = (e) => {
        e.preventDefault()
        setNewTitle(title)
        setTitleChange(false)
    }

    return (
        <div className="flex flex-col gap-3 justify-center w-full p-3 rounded-lg border border-zinc-300 shadow-md">
            <div className="flex items-center justify-between">
                {
                    titleChange
                        ?
                        <input onChange={handleChange} type="text" value={newTitle} className="border border-zinc-300 rounded-lg outline-purple-500 px-3 py-2" />
                        :
                        <p className="text-2xl font-bold">{title}</p>
                }
                {
                    edit
                    &&
                    <div className="flex items-center justify-center">
                        {titleChange ?
                            <>
                                <div onClick={hadleConfirm} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                                    <Check />
                                </div>
                                <div onClick={hadleNotConfirm} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                                    <X />
                                </div>
                                <div onClick={onDeleteGroup} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                                    <Trash2 />
                                </div>
                            </>
                            :
                            <>
                                <div onClick={() => { setTitleChange(true) }} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                                    <Pen />
                                </div>
                                <div onClick={onDeleteGroup} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                                    <Trash2 />
                                </div>
                            </>}
                    </div>
                }

            </div>
            {
                data.links.map((item, index) => {
                    return <LinkGroup data={item} edit={true} key={index} />
                })
            }
            <button className="cursor-pointer hover:bg-purple-500/20 shadow-md flex gap-3 items-center justify-center border border-dashed border-zinc-300 w-full px-4 py-2 rounded-lg text-sm text-black font-semibold">
                <Plus size={20} />
                <p>Add New Links</p>
            </button>
        </div>
    )
}

export function ModalGroupComponent({ data, setData, closeModal }) {
    const [input, setInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    const handleCreate = (e) => {
        e.preventDefault()
        if (input === "") return

        setData([...data,
        {
            "title": input,
            "links": []
        }
        ])
        closeModal()
    }



    return (
        <div className="absolute z-50 bg-black/70 w-screen h-screen border flex items-center justify-center">
            <div className="max-w-[400px] w-full border border-zinc-300 bg-white rounded-lg p-3 flex flex-col gap-3">
                <div className="w-full flex items-center justify-between">
                    <p className="font-bold">Add new group</p>
                    <div onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                        <X />
                    </div>
                </div>


                <div className="text-sm font-semibold">
                    <p>Group Name</p>
                    <input onChange={handleChange} type="text" name="name" placeholder="Social Media, Projects, Contact, ..." value={input} className="w-full rounded-lg border border-zinc-300 px-3 py-2" />
                </div>
                <div className="w-full flex items-center justify-end">
                    <button onClick={handleCreate} className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-400 px-4 py-2 rounded-lg text-sm text-white font-semibold">
                        <p>Create Group</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

