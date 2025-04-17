import { Pen, Trash2, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export function LinkGroup({ data, edit = false }) {
    const { name, value } = data
    console.log(name,value);
    
    return (
        <div className={`${edit ? "justify-between" : "justify-center cursor-pointer"} hover:shadow-md flex gap-3 items-center border border-zinc-300 w-full px-4 py-2 rounded-lg text-sm text-black font-semibold`}>
            <p className="text-lg font-bold">{name}</p>
            {
                edit &&
                <div className="flex gap-1 items-center justify-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                        <Pen />
                    </div>
                    <Link href={value.startsWith("http") ? value : `https://${value}`} target="_blank" className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                        <SquareArrowOutUpRight />
                    </Link>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-purple-500/20">
                        <Trash2 />
                    </div>
                </div>
            }
        </div>
    )
}