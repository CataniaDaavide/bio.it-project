import { ArrowRight, Link, Palette, Users } from "lucide-react";

export function Funzionalita(){
    const dataFunzionalita = [
        {
          "icon":<Link/>,
          "title": "Raccogli i tuoi link",
          "description": "Aggiungi i tuoi social media, siti web e altre risorse in un'unica pagina facile da condiviere.",
        },
        {
          "icon":<Users/>,
          "title": "Condividi facilmente",
          "description": "Condividi il tuo profilo bio.it sui socila o aggiungi il link nella tua bio su Instagram, TikTok, Twitter e altro.",
        },
        {
          "icon":<Palette/>,
          "title": "Personalizza il tuo profilo",
          "description": "Modifica il tuo profilo con nome, biografia e immagine. Organizza i link in gruppi per una migliore gestione",
        },
      ]
    return (     
         <div className="w-full flex flex-col items-center justify-center px-3 py-20 gap-5 bg-zinc-100/90">
        <p className="text-3xl font-bold ">Come funziona bio.it</p>
        <div className="flex flex-wrap items-center justify-center gap-5 p-3">
          {dataFunzionalita.map((data, index) => {
            return <CardFunzionalita data={data} key={index} />
          })}
        </div>
      </div>

    )
}

export function CardFunzionalita({ data }) {
    const { icon, title, description } = data
    return (
      <div className="flex flex-col items-center justify-center max-w-[500px] w-full h-52 rounded-lg shadow-md p-5 gap-3 border border-zinc-300 text-center bg-white">
        <div className="bg-purple-500/20 w-10 h-10 p-3 rounded-full flex items-center justify-center text-purple-700">
          {icon}
        </div>
        <p className="font-semibold text-xl">{title}</p>
        <p className="text-md text-gray-500">{description}</p>
      </div>
    )
  }
  