"use client"
import { useContext, useState, useEffect } from "react";
import { Plus, Pen, X, Trash2, Check } from "lucide-react";
import { LinkGroupPrivate, LinkGroupPublic } from "./link";
import ButtonIcon from "./buttonIcon";
import InputBox from "./inputBox";
import { UserContext } from "../context/UserContext";
import updateUser from "../utils/updateUser";
import LoaderComponent from "./loader";


export function GroupPrivate({ idGruppo, deleteFn, openModalFn }) {
    const { user, setUser, isLoading } = useContext(UserContext)
    const gruppo = user.gruppi.filter((g) => g.id === idGruppo)[0]
    const [titleChange, setTitleChange] = useState(false)
    const [title, setTitle] = useState(gruppo.title)
    const [links, setLinks] = useState(gruppo.links)
    const [newTitle, setNewTitle] = useState(title)

    useEffect(() => {
        setTitle(gruppo.title)
        setLinks(gruppo.links)       
    },[user])

    if(isLoading){
        return <LoaderComponent/>
    }
    const deleteLink = async (index) => {} //TODO:
    // const deleteLink = async (index) => {

    //     const newLinks = [...links];
    //     newLinks.splice(index, 1); // rimuovi il gruppo in posizione `index`

    //     const res = await updateUser({ email: user.email, gruppi: newGruppi })
    //     if (res.ok) {
    //         const data = await res.json()
    //         setUser({ ...data.user})
    //     }
    // }

    const handleChange = (e) => {
        e.preventDefault()
        setNewTitle(e.target.value)
    }
    const hadleConfirm = async (e) => {
        e.preventDefault()
        const res = await updateUser({ email: user.email, idGruppo, titleGruppo: newTitle })
        if (res.ok) {
            const data = await res.json()
            setUser({ ...data.user })
            setTitle(newTitle)
        }
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

                <div className="flex items-center justify-center">
                    {titleChange ?
                        <>
                            <ButtonIcon icon={<Check />} fn={hadleConfirm} />
                            <ButtonIcon icon={<X />} fn={hadleNotConfirm} />
                        </>
                        :
                        <>
                            <ButtonIcon icon={<Pen />} fn={() => { setTitleChange(true) }} />
                            <ButtonIcon icon={<Trash2 />} fn={deleteFn} />
                        </>}
                </div>


            </div>
            {
                links.map((link, index) => {
                    return (
                        <LinkGroupPrivate
                            key={index}
                            idLink={link.id}
                            idGruppo={idGruppo}
                            deleteFn={() => { deleteLink(index)}} />
                    )
                })
            }

            <button onClick={() => { openModalFn(idGruppo) }} className="cursor-pointer hover:bg-purple-500 hover:border-purple-500 shadow-md flex gap-3 items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 w-full px-4 py-2 rounded-lg text-sm text-black dark:text-white font-semibold">
                <Plus size={20} />
                <p>Add New Link</p>
            </button>

        </div>
    )
}

export function GroupPublic({ data }) {
    const { title, links } = data
    return (
        <div className="flex flex-col gap-3 justify-center w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-black dark:text-white shadow-md">
            <div className="flex items-center justify-start gap-3 cursor-pointer">
                <p className="text-2xl font-bold">{title}</p>
            </div>
            {
                links.map((item, index) => {
                    return (
                        <LinkGroupPublic
                            data={item}
                            key={index}
                        />
                    )
                })
            }
        </div>
    )
}

export function ModalGroupComponent({ closeModal }) {
    const { user, setUser, isLoading } = useContext(UserContext);
    const [input, setInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    const handleCreate = async (e) => {
        e.preventDefault()
        if (input === "") return

        const gruppi = [...user.gruppi]
        gruppi.push(
            {
                "id": crypto.randomUUID(),
                "title": input,
                "links": []
            }
        )
        const res = await updateUser({ email: user.email, gruppi })
        if (res.ok) {
            const data = await res.json()
            setUser({ ...data.user })
        }
        closeModal()
    }



    return (
        <div className="absolute z-50 bg-black/70 w-full h-screen flex items-center justify-center p-3">
            <div className="max-w-[500px] w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg p-3 flex flex-col gap-5">
                <div className="w-full flex items-center justify-between">
                    <p className="font-bold text-2xl">Add new group</p>
                    <ButtonIcon icon={<X />} fn={closeModal} />
                </div>


                <InputBox data={{ title: "Group Name", name: "text", type: "text", placeholder: "Social Media, Projects, Contact, ...", value: input, fn: handleChange }} />
                <div className="w-full flex items-center justify-end">
                    <button onClick={handleCreate} className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-500 hover:bg-purple-500/80 px-4 py-2 rounded-lg text-sm text-white font-semibold">
                        <p>Create Group</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

