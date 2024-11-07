
import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs'; 
import { prisma } from '@lib/prisma'; 
import { signIn } from 'next-auth/react';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Alla fält måste vara ifyllda' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Fel e-post eller lösenord' },
        { status: 401 }
      );
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Fel e-post eller lösenord' },
        { status: 401 }
      );
    }

    const session = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Inloggningen misslyckades' },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: 'Inloggad', session });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { error: 'Något gick fel vid inloggning' },
      { status: 500 }
    );
  }
}
