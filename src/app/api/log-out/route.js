// api/auth/removeToken.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = await cookies()
    await cookieStore.delete("token")
    return new NextResponse(JSON.stringify({ message: 'Utente sloggato' }), { status: 200 });
  } catch (error) {
    console.error("Errore rimozione token:", error);
    return new NextResponse(JSON.stringify({ message: 'Errore nella rimozione del token' }), { status: 500 });
  }
}
