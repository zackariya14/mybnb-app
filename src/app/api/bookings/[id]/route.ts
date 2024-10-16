import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

// Hämta en specifik bokning
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
  });
  
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json(booking);
}

// Uppdatera en specifik bokning
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const updatedBooking = await prisma.booking.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(updatedBooking);
}

// Ta bort en specifik bokning
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.booking.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'Booking deleted' });
}
