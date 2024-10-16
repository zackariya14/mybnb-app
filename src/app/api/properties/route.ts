import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

// Hämta alla fastigheter
export async function GET() {
  const properties = await prisma.property.findMany();
  return NextResponse.json(properties);
}

// Skapa en ny fastighet
export async function POST(request: Request) {
  const data = await request.json();
  const newProperty = await prisma.property.create({
    data,
  });
  return NextResponse.json(newProperty, { status: 201 });
}
