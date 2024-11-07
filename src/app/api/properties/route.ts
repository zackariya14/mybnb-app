import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { v4 as uuidv4 } from 'uuid'; 
import { promises as fs } from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb'; 

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

fs.mkdir(uploadDir, { recursive: true });

export async function GET() {
  try {
    const properties = await prisma.property.findMany();
    console.log("Fetched properties:", properties); 
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
    }

    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error("Failed to delete property:", error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    console.log("Form Data received:", Array.from(formData.entries()));

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const location = formData.get('location')?.toString();
    const pricePerNight = parseFloat(formData.get('pricePerNight')?.toString() || '0');
    const files = formData.getAll('images') as File[];
    const ownerIdString = formData.get('ownerId')?.toString(); 

    if (!ownerIdString || !ObjectId.isValid(ownerIdString)) {
      console.log("Invalid ownerId:", ownerIdString);
      return NextResponse.json({ error: 'Invalid ownerId' }, { status: 400 });
    }

    const ownerId = new ObjectId(ownerIdString); 

    if (!name || !description || !location || !pricePerNight || files.length === 0 || !ownerId) {
      console.log("Missing required fields:", { name, description, location, pricePerNight, ownerId, files });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      const fileExtension = path.extname(file.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);
  
      const buffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));
      imageUrls.push(`/uploads/${fileName}`);
    }
  
    const newProperty = await prisma.property.create({
      data: {
        name,
        description,
        location,
        pricePerNight,
        imageUrls,
        ownerId: ownerId.toString(), 
      },
    });

    return NextResponse.json(newProperty, { status: 201 });
  
  } catch (error) {
    console.error("Failed to create property:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to create property', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Failed to create property', details: 'Unknown error occurred' }, { status: 500 });
  }
}
