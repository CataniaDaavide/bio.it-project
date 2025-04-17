import { NextResponse } from "next/server";
import connectDB from "@/app/utils/connectDB";
import { usersModel } from "@/app/models/usersModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
export async function POST(req) {
    try {
        const { email, password } = await req.json()
        console.log(email,password);
        
        // Connessione al database
        await connectDB();

        // Controllo se esiste l'utente nel database
        // lean ritorna un oggetto js e non un documento di mongose su cui puoi usare vari metodi
        const user = await usersModel.findOne({ email })
        if (!user) return new NextResponse(JSON.stringify({ message: 'Utente non trovato' }), { status: 500 })
                
        // Utente trovato, controllo password com hashPassword che era salvata nel database
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return new NextResponse(JSON.stringify({ message: 'Password errata' }), { status: 500 })

        const userData = user.toObject();
        delete userData._id
        delete userData.password;

        // Creazione token e ritorno 
        const token = jwt.sign({ email, id: user._id, name:user.name }, process.env.SECRET_TOKEN)
        const cookieStore = await cookies()
        cookieStore.set('token', token);
        return new NextResponse(JSON.stringify({ message: 'Utente loggato', user:userData }), { status: 200 })
    } catch (error) {        
        return new NextResponse(JSON.stringify({ message: 'Errore durante il login' }), { status: 500 });
    }
}
