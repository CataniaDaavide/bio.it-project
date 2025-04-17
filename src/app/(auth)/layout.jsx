import Link from "next/link";
import ToggleTheme from "../components/toggleTheme";
export default function layoutAuth({ children }) {

    return (
        <div className="w-full h-full flex items-center justify-center flex-col gap-5 p-3">
            <div className="absolute top-3 right-3">
                <ToggleTheme/>
            </div>
            <Link href="/" className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</Link>
            {children}
        </div>
    );
}

