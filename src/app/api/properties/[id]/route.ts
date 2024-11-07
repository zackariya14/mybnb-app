
import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { getServerSession } from 'next-auth'; 
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const propertyId = params.id;

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;  
    const propertyId = params.id;

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (property.ownerId !== userId) {
      return NextResponse.json({ error: 'Only the owner can edit this property' }, { status: 403 });
    }

    const data = await request.json();

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        pricePerNight: parseFloat(data.pricePerNight),
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Failed to update property:", error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}
