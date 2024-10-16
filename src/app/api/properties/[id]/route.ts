import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

// Hämta en specifik fastighet
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  return NextResponse.json(property);
}

// Uppdatera en specifik fastighet
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const updatedProperty = await prisma.property.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(updatedProperty);
}

// Ta bort en specifik fastighet
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.property.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'Property deleted' });
}
