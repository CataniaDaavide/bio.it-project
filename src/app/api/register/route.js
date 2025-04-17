import { NextResponse } from "next/server";
import connectDB from "@/app/utils/connectDB";
import { usersModel } from "@/app/models/usersModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function POST(req) {    
    try {
        const { name,email,password} = await req.json();
        
        // Connessione al database
        await connectDB();

        let user = await usersModel.findOne({email:email}) 
        
        if (user) return new NextResponse(JSON.stringify({ message: 'Email già usata' }), { status: 500 })


        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creazione del nuovo utente
        user = await usersModel.create({name,email, password: hashedPassword,gruuppi:[]});
        

        const userData = user.toObject();
        delete userData._id
        delete userData.password;

        // Generazione del token
        const token = jwt.sign({ email: user.email, id: user._id, name}, process.env.SECRET_TOKEN, { expiresIn: "1h" });
        const cookieStore = await cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'strict', // migliora la sicurezza
            maxAge: 60 * 60 // 1 ora
          });
        
        return new NextResponse(JSON.stringify({ message: 'Utente creato', user:userData }), { status: 200 });
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante la registrazione' }), { status: 500 });
    }
}
