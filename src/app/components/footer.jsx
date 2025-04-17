export function Footer(){
    const anno = new Date().getFullYear()
    return (
      <div className="border-t py-3 flex items-center justify-center border-zinc-300">
        <p>{anno} bio.it - Creato da davidecatania </p>
      </div>
    )
}