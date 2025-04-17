import { Pen, Trash2, SquareArrowOutUpRight, Check, X } from "lucide-react";
import Link from "next/link";
import ButtonIcon from "./buttonIcon";
import { useContext, useState } from "react";
import InputBox from "./inputBox";
import { UserContext } from "../context/UserContext";

export function LinkGroup({ data, editMode = false, deleteFn }) {
    const [isEdit, setIsEdit] = useState(false)
    const { name, value } = data
    const [linkData, setLinkData] = useState({ name: name, link: value })
    const [newLinkData, setNewLinkData] = useState(linkData)

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setNewLinkData({ ...newLinkData, [name]: value })
    }

    const hadleConfirm = (e) => {
        e.preventDefault()
        setLinkData(newLinkData)
        setIsEdit(false)
    }

    const hadleNotConfirm = (e) => {
        e.preventDefault()
        setNewLinkData(linkData)
        setIsEdit(false)
    }

    return (
        <>
            {
                editMode
                    ?
                    <div className={`justify-between hover:shadow-md flex gap-3 items-center border dark:text-white border-zinc-300 dark:border-zinc-700 w-full p-3 rounded-xl text-sm text-black font-semibold`}>
                        {
                            isEdit
                                ?
                                <div className="flex flex-col gap-1 w-full">
                                    <InputBox data={{ name: "name", type: "text", placeholder: "Title link", value: newLinkData.name, fn: handleChange }} />
                                    <InputBox data={{ name: "link", type: "text", placeholder: "Link URL", value: newLinkData.link, fn: handleChange }} />
                                </div>
                                :
                                <div>
                                    <p className="text-lg font-bold">{linkData.name}</p>
                                    <p className="text-sm underline cursor-pointer">{linkData.link}</p>
                                </div>
                        }

                        <div className="flex gap-1 items-center justify-center">
                            {
                                isEdit
                                    ?
                                    <>
                                        <ButtonIcon icon={<Check />} fn={hadleConfirm} />
                                        <ButtonIcon icon={<X />} fn={hadleNotConfirm} />
                                    </>
                                    :
                                    <ButtonIcon icon={<Pen />} fn={() => { setIsEdit(true) }} />
                            }
                            <Link href={value.startsWith("http") ? value : `https://${linkData.link}`} target="_blank">
                                <ButtonIcon icon={<SquareArrowOutUpRight />} />
                            </Link>
                            <ButtonIcon icon={<Trash2 />} fn={deleteFn} />
                        </div>
                    </div>
                    :
                    <Link href={value.startsWith("http") ? value : `https://${linkData.link}`} target="_blank" className={`justify-center hover:shadow-md flex gap-3 items-center border dark:text-white border-zinc-300 dark:border-zinc-700 w-full p-3 rounded-xl text-sm text-black font-semibold`}>
                        <p className="text-lg font-bold">{linkData.name}</p>
                    </Link>
            }
        </>



    )
}



export function ModalLinkomponent({ closeModal }) {
    const { user, setUser, isLoading } = useContext(UserContext);
    const [modalInput, setModalInput] = useState({ title: "", link: "" })

    const handleChange = (e) => {
        e.preventDefault()
        const {name,value} = e.target
        setModalInput({...modalInput,[name]:value})
    }


    const handleCreate = async (e) => {
        e.preventDefault()

        const url = `/api/update-user`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, gruppi }),
        };

        const res = await fetch(url, options)
        if (res.ok) {
            const data = await res.json()
            setUser({ ...user, "gruppi": gruppi })
            closeModal()
        }
    }

    return (
        <div className="absolute z-50 bg-black/70 w-full h-screen flex items-center justify-center p-3">
            <div className="max-w-[500px] w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg p-3 flex flex-col gap-3">
                <div className="w-full flex items-center justify-between">
                    <p className="font-bold text-2xl">Add new group</p>
                    <ButtonIcon icon={<X />} fn={closeModal} />
                </div>


                <InputBox data={{ title: "Title", name:"title", type:"text", placeholder: "My Website", value: modalInput.title, fn: handleChange }} />
                <InputBox data={{ title: "URL", name:"link", type:"text", placeholder: "https://example.com", value: modalInput.link, fn: handleChange }} />
                <div className="w-full flex items-center justify-end">
                    <button onClick={handleCreate} className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-500 hover:bg-purple-500/80 px-4 py-2 rounded-lg text-sm text-white font-semibold">
                        <p>Create Group</p>
                    </button>
                </div>
            </div>
        </div>
    )
}



