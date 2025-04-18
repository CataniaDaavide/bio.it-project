import Link from "next/link";
import ToggleTheme from "./toggleTheme";
export default function Nav({ children }) {

    return (
        <div className="w-full flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</Link>

            {/* pulsanti */}
            <div className="flex gap-1">
                <ToggleTheme />
                {children}
            </div>
        </div>
    );
}
