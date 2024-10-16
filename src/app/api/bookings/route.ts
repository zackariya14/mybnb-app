import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function GET() {
  const bookings = await prisma.booking.findMany();
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newBooking = await prisma.booking.create({
    data,
  });
  return NextResponse.json(newBooking, { status: 201 });
}
