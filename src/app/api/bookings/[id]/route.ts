import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (!params?.id) {
    return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
  });

  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json(booking, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!params?.id) {
    return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
  });

  if (!booking || booking.userId !== session.user.id) {
    return NextResponse.json({ error: 'Booking not found or unauthorized' }, { status: 404 });
  }

  try {
    const data = await request.json();
    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!params?.id) {
    return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
  }

  const bookingId = params.id;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.userId !== session.user.id) {
      return NextResponse.json({ error: 'Booking not found or unauthorized' }, { status: 404 });
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json({ message: 'Booking successfully canceled' }, { status: 200 });
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
