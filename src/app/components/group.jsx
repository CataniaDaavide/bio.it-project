"use client"
import { useState } from "react";
import { Plus, Pen, X, Trash2, Check } from "lucide-react";
import { LinkGroup } from "./link";
import ButtonIcon from "./buttonIcon";
import InputBox from "./inputBox";

export function Group({ data, editMode = false, deleteFn }) {
    const [titleChange, setTitleChange] = useState(false)
    const [title, setTitle] = useState(data.title)
    const [links, setLinks] = useState(data.links)
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
        <div className="flex flex-col gap-3 justify-center w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-black dark:text-white shadow-md">
            <div className="flex items-center justify-between gap-3">
                {
                    titleChange
                        ?
                        <InputBox data={{ name: "text", type: "text", value: newTitle, fn: handleChange }} />
                        :
                        <p className="text-2xl font-bold">{title}</p>
                }
                {
                    editMode
                    &&
                    <div className="flex items-center justify-center">
                        {titleChange ?
                            <>
                                <ButtonIcon icon={<Check />} fn={hadleConfirm} />
                                <ButtonIcon icon={<X />} fn={hadleNotConfirm} />
                            </>
                            :
                            <>
                                <ButtonIcon icon={<Pen />} fn={() => { setTitleChange(true) }} />
                            </>}
                        <ButtonIcon icon={<Trash2 />} fn={deleteFn} />
                    </div>
                }

            </div>
            {
                links.map((item, index) => {
                    return <LinkGroup data={item} editMode={editMode} key={index}
                        deleteFn={() => {
                            const newLinks = [...links];
                            newLinks.splice(index, 1); // rimuovi il gruppo in posizione `index`
                            setLinks(newLinks);
                        }} />
                })
            }
            {editMode &&
                <button onClick={() => { }} className="cursor-pointer hover:bg-purple-500 hover:border-purple-500 shadow-md flex gap-3 items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 w-full px-4 py-2 rounded-lg text-sm text-black dark:text-white font-semibold">
                    <Plus size={20} />
                    <p>Add New Link</p>
                </button>
            }
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
        <div className="absolute z-50 bg-black/70 w-full h-screen flex items-center justify-center">
            <div className="max-w-[400px] w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg p-3 flex flex-col gap-3">
                <div className="w-full flex items-center justify-between">
                    <p className="font-bold">Add new group</p>
                    <ButtonIcon icon={<X />} fn={closeModal} />
                </div>


                <InputBox data={{ title: "Group Name", name: "text", type: "text", placeholder: "Social Media, Projects, Contact, ...", value: input, fn: handleChange }} />
                <div className="w-full flex items-center justify-end">
                    <button onClick={handleCreate} className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-400 px-4 py-2 rounded-lg text-sm text-white font-semibold">
                        <p>Create Group</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

