import { Pen, Trash2, SquareArrowOutUpRight, Check, X, Group } from "lucide-react";
import Link from "next/link";
import ButtonIcon from "./buttonIcon";
import { useContext, useEffect, useState } from "react";
import InputBox from "./inputBox";
import { UserContext } from "../context/UserContext";
import updateUser from "../utils/updateUser";

export function LinkGroupPrivate({ idLink, idGruppo, deleteFn }) {
    const { user, setUser, isLoading } = useContext(UserContext)
    const link = user.gruppi.filter((g) => g.id === idGruppo)[0].links.filter((l) => l.id === idLink)[0]
    console.log(link);

    const [isEdit, setIsEdit] = useState(false)
    const [linkData, setLinkData] = useState({ id: link.id, name: link.name, link: link.link })
    const [newLinkData, setNewLinkData] = useState(linkData)

    useEffect(() => {
        setLinkData({ id: link.id, name: link.name, link: link.link })
    }, [user])

    if (isLoading) {
        return <LoaderComponent />
    }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setNewLinkData({ ...newLinkData, [name]: value })
    }

    const hadleConfirm = async (e) => {
        e.preventDefault()

        const res = await updateUser({ email: user.email, idGruppo, linkData: newLinkData })
        if (res.ok) {
            const data = await res.json()
            setUser({ ...data.user })
            setLinkData(newLinkData)
        }
        setIsEdit(false)

    }

    const hadleNotConfirm = (e) => {
        e.preventDefault()
        setNewLinkData(linkData)
        setIsEdit(false)
    }

    return (

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
                        <>
                            <ButtonIcon icon={<Pen />} fn={() => { setIsEdit(true) }} />
                            <Link href={linkData.link.startsWith("http") ? link : `https://${linkData.link}`} target="_blank">
                                <ButtonIcon icon={<SquareArrowOutUpRight />} />
                            </Link>
                            <ButtonIcon icon={<Trash2 />} fn={deleteFn} />
                        </>
                }

            </div>
        </div>
    )
}

export function LinkGroupPublic({ data }) {
    const { link, name } = data
    return (
        <Link href={link.startsWith("http") ? value : `https://${link}`} target="_blank" className={`justify-center hover:shadow-md flex gap-3 items-center border dark:text-white border-zinc-300 dark:border-zinc-700 w-full p-3 rounded-xl text-sm text-black font-semibold`}>
            <p className="text-lg font-bold">{name}</p>
        </Link>
    )
}



export function ModalLinkomponent({ idGruppo, closeModal }) {
    const { user, setUser, isLoading } = useContext(UserContext);
    const [modalInput, setModalInput] = useState({ name: "", link: "" })

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setModalInput({ ...modalInput, [name]: value })
    }


    const handleCreate = async (e) => {
        e.preventDefault()

        const linkData = {
            id: crypto.randomUUID(),
            name: modalInput.name,
            link: modalInput.link,
        }
        console.log({ email: user.email, idGruppo, linkData });

        const res = await updateUser({ email: user.email, idGruppo, linkData })
        if (res.ok) {
            const data = await res.json()
            console.log(data.user.gruppi);
            setUser({ ...data.user })
        }
        closeModal()
    }

    return (
        <div className="absolute z-50 bg-black/70 w-full h-screen flex items-center justify-center p-3">
            <div className="max-w-[500px] w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg p-3 flex flex-col gap-3">
                <div className="w-full flex items-center justify-between">
                    <p className="font-bold text-2xl">Add new group</p>
                    <ButtonIcon icon={<X />} fn={closeModal} />
                </div>


                <InputBox data={{ title: "Title", name: "name", type: "text", placeholder: "My Website", value: modalInput.name, fn: handleChange }} />
                <InputBox data={{ title: "Link", name: "link", type: "text", placeholder: "https://example.com", value: modalInput.link, fn: handleChange }} />
                <div className="w-full flex items-center justify-end">
                    <button onClick={handleCreate} className="cursor-pointer hover:shadow-md flex gap-1 items-center bg-purple-500 hover:bg-purple-500/80 px-4 py-2 rounded-lg text-sm text-white font-semibold">
                        <p>Create Group</p>
                    </button>
                </div>
            </div>
        </div>
    )
}



