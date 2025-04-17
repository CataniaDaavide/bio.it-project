"use client"
import { useContext, useState, useEffect } from "react"
import { Pen, Check, X } from "lucide-react"
import ButtonIcon from "./buttonIcon"
import InputBox from "./inputBox"
import { UserContext } from "../context/UserContext"
import LoaderComponent from "./loader"

export function BioPrivate() {
    const [isEdit, setIsEdit] = useState(false)
    const { user, setUser, isLoading } = useContext(UserContext)
    const [newUser, setNewUser] = useState(user)

    useEffect(() => {
        if (user) setNewUser(user)
    }, [user])

    if (!user) return <BioSkeleton />

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    const hadleConfirm = async (e) => {
        e.preventDefault()

        const url = `/api/update-user`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: newUser.email, description: newUser.description, name: newUser.name, avatar: newUser.avatar }),
        };
        const res = await fetch(url, options)
        if (res.ok) {
            const data = await res.json()
            setUser(newUser)
            setIsEdit(false)
        }


    }
    const hadleNotConfirm = (e) => {
        e.preventDefault()
        setNewUser(user)
        setIsEdit(false)
    }

    return (
        <div className="relative text-black dark:text-white flex flex-col gap-3 items-center text-center justify-center w-full p-5 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-md">

            {user.avatar
                ?
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500">
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
                    <div className="w-full text-start flex flex-col gap-3">
                        <InputBox data={{ name: "avatar", type: "email", placeholder: "Avatar URL", value: newUser.avatar, fn: handleChange }} />
                        <InputBox data={{ title: "Email", name: "name", type: "name", placeholder: "Your name", value: newUser.name, fn: handleChange }} />
                        <textarea rows={5} onChange={handleChange} name="description" placeholder={"Your bio"} value={newUser.description}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 focus:outline focus:outline-purple-500 focus:border-purple-500" />
                    </div>
                    :
                    <div className="w-full flex flex-col gap-2">
                        <p className="text-2xl font-bold">{user.name}</p>
                        <p className="text-md text-gray-500 break-words overflow-hidden">{user.description}</p>
                    </div>
            }
            <div className="absolute top-3 right-3 flex">
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
            </div>
        </div>

    )
}


export function BioPublic({ data }) {
    const { name, description, avatar } = data

    return (
        <div className="relative text-black dark:text-white flex flex-col gap-3 items-center text-center justify-center w-full p-5 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-md">
            {avatar
                ?
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500">
                    <img
                        src={avatar}
                        alt="avatar"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                :
                <div className="bg-purple-500/20 w-24 h-24 p-3 rounded-full flex items-center justify-center text-purple-700">
                    <p className="text-3xl">{name.charAt(0).toUpperCase()}</p>
                </div>
            }

            <div className="w-full flex flex-col gap-2">
                <p className="text-2xl font-bold">{name}</p>
                <p className="text-md text-gray-500 break-words overflow-hidden">{description}</p>
            </div>
        </div>

    )
}


function BioSkeleton() {
    return (
        <div className="relative text-black dark:text-white flex flex-col gap-3 items-center text-center justify-center w-full p-5 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-md">

            <div className="bg-purple-500/20 w-24 h-24 p-3 rounded-full flex items-center justify-center text-purple-700" />
            <div className="w-full flex flex-col gap-2 items-center justify-center">
                <p className="text-2xl font-bold w-58 h-5 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="flex flex-col gap-1 items-center justify-center">
                    <p className="text-2xl font-bold w-96 h-5 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    <p className="text-2xl font-bold w-78 h-5 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                </div>
            </div>
        </div>
    )
}