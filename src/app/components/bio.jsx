"use client"
import { useState } from "react"
import { Pen, Check, X } from "lucide-react"
import ButtonIcon from "./buttonIcon"
import InputBox from "./inputBox"

export function Bio({ data, editMode = false }) {
    
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState(data)
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
                        <InputBox data={{ title: "Email", name: "name", type:"name", placeholder: "Your name", value: newUser.name, fn: handleChange }} />
                        <textarea rows={5} onChange={handleChange} name="description" placeholder={"Your bio"} value={newUser.description}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 focus:outline focus:outline-purple-500 focus:border-purple-500" />
                    </div>
                    :
                    <div className="w-full">
                        <p className="text-2xl font-bold">{user.name}</p>
                        <p className="text-md text-gray-500 break-words overflow-hidden">{user.description}</p>
                    </div>
                     }   

            {
                editMode &&
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
            }
        </div>

    )
}