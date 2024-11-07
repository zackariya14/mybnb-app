import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { propertyId, checkInDate, checkOutDate, totalPrice } = await request.json();

  if (!propertyId || !checkInDate || !checkOutDate || !totalPrice) {
    return NextResponse.json({ error: 'Invalid booking data' }, { status: 400 });
  }

  try {
    const newBooking = await prisma.booking.create({
      data: {
        propertyId,
        userId: session.user.id,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        totalPrice,
      },
    });
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Booking failed:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        property: {
          select: {
            name: true,
            location: true,
          },
        },
      },
      orderBy: { checkInDate: 'asc' },
    });
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
