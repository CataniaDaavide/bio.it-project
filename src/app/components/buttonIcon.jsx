export default function ButtonIcon({icon,fn}) {

  return (
    <div onClick={fn} className="w-8 h-8 rounded-full flex items-center justify-center p-2 cursor-pointer text-purple-700 hover:bg-purple-500/20">
    {icon}
    </div>
  );
}

