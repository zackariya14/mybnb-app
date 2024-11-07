'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  ownerId: string;
}

interface Booking {
  id: string;
  property: {
    name: string;
    location: string;
  };
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json();
      if (session.user.isAdmin) {
        setProperties(data);
      } else {
        setProperties(data.filter((property: Property) => property.ownerId === session?.user.id));
      }
    };

    const fetchBookings = async () => {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    };

    fetchProperties();
    if (!session.user.isAdmin) {
      fetchBookings();
    }
  }, [session, router]);

  const handleEdit = (id: string) => {
    router.push(`/properties/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Är du säker att du vill ta bort denna fastighet?')) {
      await fetch(`/api/properties?id=${id}`, {
        method: 'DELETE',
      });
      setProperties((prev) => prev.filter((property) => property.id !== id));
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (confirm('Är du säker på att du vill avboka denna bokning?')) {
      try {
        const response = await fetch(`/api/bookings/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Bokning avbokad.');
          setBookings((prev) => prev.filter((booking) => booking.id !== id));
        } else {
          const errorData = await response.json();
          alert(`Avbokning misslyckades: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error canceling booking:', error);
        alert('Något gick fel med avbokningen.');
      }
    }
  };

  if (!session) {
    return <div className="text-center text-lg">Laddar...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Min Profil</h1>
      
      {session.user.isAdmin && (
        <div className="text-center mb-6">
          <span className="text-white bg-red-500 px-4 py-2 rounded-full font-bold">
            Admin Account
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-700">Fastigheter</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={() => router.push('/properties/new')}
            >
              Lägg till Ny Fastighet
            </button>
          </div>

          {properties.length === 0 ? (
            <p className="text-gray-600">Inga fastigheter hittades.</p>
          ) : (
            <ul className="space-y-4">
              {properties.map((property) => (
                <li
                  key={property.id}
                  className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-blue-600">{property.name}</h3>
                  <p className="text-gray-700">{property.description}</p>
                  <p className="text-gray-800 font-medium">Plats: {property.location}</p>
                  <p className="text-gray-800 font-semibold">
                    Pris per natt: <span className="text-blue-600">{property.pricePerNight} $</span>
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => handleEdit(property.id)}
                    >
                      Redigera
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleDelete(property.id)}
                    >
                      Ta bort
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!session.user.isAdmin && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Mina Bokningar</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-600">Inga bokningar hittades.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map((booking) => (
                  <li key={booking.id} className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-blue-600">{booking.property.name}</h3>
                    <p className="text-gray-700">Plats: {booking.property.location}</p>
                    <p className="text-gray-700">
                      Incheckning: {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      Utcheckning: {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-800 font-semibold">
                      Totalpris: <span className="text-green-600">${booking.totalPrice}</span>
                    </p>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    >
                      Avboka
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 bg-white border rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Kontoinformation</h2>
        <p className="text-gray-800">
          <span className="font-semibold">Namn:</span> {session.user?.name}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Email:</span> {session.user?.email}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
