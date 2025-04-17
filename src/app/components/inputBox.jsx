export default function InputBox({ data }) {
    const { title, name, type, placeholder, value, fn } = data

    return (
        <>
            {
                title
                    ?
                    <div className="text-sm font-semibold flex flex-col gap-1">
                        <p>{title}</p>
                        <input onChange={fn} type={type} name={name} placeholder={placeholder} value={value} 
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 focus:outline focus:outline-purple-500 focus:border-purple-500" />
                    </div>
                    :
                    <input onChange={fn} type={type} name={name} placeholder={placeholder} value={value} 
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 focus:outline focus:outline-purple-500 focus:border-purple-500" />
                }
        </>
    );
}

