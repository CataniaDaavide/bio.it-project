import { usersModel } from "@/app/models/usersModel";
import connectDB from "@/app/utils/connectDB";
import isImage from "@/app/utils/isImage";
import isValidURL from "@/app/utils/isValidURL";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const {email, description,name,avatar, gruppi} = await req.json()
                
        await connectDB()

        const user = await usersModel.findOne({email})
        if(!user){
            return new NextResponse(JSON.stringify({ message: 'Utente non trovato' }), { status: 404 });
        }
        
        if(avatar && isImage(avatar) && isValidURL(avatar)){
            user.avatar = avatar
        }

        if(name){
            user.name = name
        }

        if(description){
            user.description = description
        }

        if(gruppi){
            user.gruppi = gruppi
        }

        user.save()

        const userData = user.toObject()
        delete userData.password

        return new NextResponse(JSON.stringify({ message: 'Utente aggiornato', user:userData }), { status: 200 });

    }catch(error){
        return new NextResponse(JSON.stringify({ message: 'Errore durante l\'update' }), { status: 500 });
    }
}