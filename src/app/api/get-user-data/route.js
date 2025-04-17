import { usersModel } from "@/app/models/usersModel";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
   try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    

    const decode = jwt.decode(token, process.env.SECRET_TOKEN)
    const id = new mongoose.Types.ObjectId(decode.id)
    let userData = await usersModel.findById(id)
    userData = userData.toObject()
    delete userData.password


    return new NextResponse(JSON.stringify({message:'Dati utentE trovati', user:userData}), {status:200})
} catch (error) {
       return new NextResponse(JSON.stringify({message:'Dati utente non trovato'}), {status:200})
   }
}


export async function POST(req) {
    try {
      const { id } = await req.json();
        
      let userData = await usersModel.findOne({
        email: { $regex: new RegExp(`^${id}`, "i") }
      });
    
      if (!userData) {
        return new NextResponse(JSON.stringify({ message: "Nessun utente trovato" }), { status: 404 });
      }
      
      userData = userData.toObject()
      delete userData.password

      return new NextResponse(JSON.stringify({ message: "Utente trovato", user: userData }), { status: 200 });
  
    } catch (error) {
      console.error("Errore:", error);
      return new NextResponse(JSON.stringify({ message: "Errore del server" }), { status: 500 });
    }
  }
  
