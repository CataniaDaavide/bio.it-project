import { usersModel } from "@/app/models/usersModel";
import connectDB from "@/app/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req) {
    try{
        const aaa = await req.json()

        await connectDB()

        const user = await usersModel.findOne({email})
        if(!user){
            return new NextResponse(JSON.stringify({ message: 'Utente non trovato' }), { status: 404 });
        }

        

    }catch(error){
        return new NextResponse(JSON.stringify({ message: 'Errore durante l\'update' }), { status: 500 });
    }
}