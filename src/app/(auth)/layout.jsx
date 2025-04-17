
export default function layoutAuth({ children }) {

    return (
        <div className="w-full h-full border flex items-center justify-center flex-col gap-5 p-3">
        <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">bio.it</p>
        {children}
        </div>
    );
}

