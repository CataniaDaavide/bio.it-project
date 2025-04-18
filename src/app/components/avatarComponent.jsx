import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export function AvatarComponent() {
  const { user, setUser, isLoading } = useContext(UserContext)

  return (
    <Link href={"/profile"}>
      {
        user
        &&
        <>
          {
            user.avatar
              ?
              <div className="w-10 h-10 cursor-pointer hover:opacity-80 rounded-full overflow-hidden border-2 border-purple-500">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              :
              <div className="bg-purple-500/20 w-10 h-10 p-3 rounded-full flex items-center justify-center text-purple-700">
                <p className="text-xl">{user.name.charAt(0).toUpperCase()}</p>
              </div>
          }
        </>
      }
    </Link>
  )
}