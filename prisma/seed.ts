import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',  
      isAdmin: true,
    },
  });

  await prisma.property.createMany({
    data: [
      {
        name: 'Sunny Apartment',
        description: 'A bright and sunny apartment in the city center',
        location: 'Stockholm, Sweden',
        pricePerNight: 120,
        available: true,
        ownerId: user.id,
        imageUrls: ['https://t4.ftcdn.net/jpg/02/79/95/39/360_F_279953994_TmVqT7CQhWQJRLXev4oFmv8GIZTgJF1d.jpg']
      },
      {
        name: 'Cozy Cabin',
        description: 'A cozy cabin in the mountains with a beautiful view',
        location: 'Dalarna, Sweden',
        pricePerNight: 90,
        available: true,
        ownerId: user.id,
        imageUrls: ['https://media.gettyimages.com/id/128502214/photo/classic-turn-of-the-century-american-house.jpg?s=612x612&w=gi&k=20&c=i4olPZuStzxhaUt8Py7FzUSRaub86j2UdvezcLPtThI=']
      },
      {
        name: 'Beachfront Villa',
        description: 'A luxurious villa right on the beach',
        location: 'Gotland, Sweden',
        pricePerNight: 250,
        available: true,
        ownerId: user.id,
        imageUrls: ['https://media.istockphoto.com/id/589538090/photo/exterior-of-small-american-house-with-blue-paint.jpg?s=612x612&w=0&k=20&c=bg1x9nUvyhBRtWpuETh-2NDnSOzehq6OsxU5dAE_1bc=']
      },
    ],
  });

  console.log('Seed data added!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
