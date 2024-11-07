import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs'; // För att hash:a lösenord
import { prisma } from '@lib/prisma'; // Din Prisma-klient

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Alla fält måste vara ifyllda' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Användaren med denna e-post finns redan' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Något gick fel vid registrering' },
      { status: 500 }
    );
  }
}
