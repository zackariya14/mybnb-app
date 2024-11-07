"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const EditPropertyPage = () => {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id;
  const [property, setProperty] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    const fetchProperty = async () => {
      if (!propertyId) {
        console.error('No property ID found in the URL');
        return;
      }

      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        if (!response.ok) {
          console.error('Failed to fetch property:', response.statusText);
          return;
        }
        const data = await response.json();
        setProperty(data);
        setName(data.name);
        setDescription(data.description);
        setLocation(data.location);
        setPricePerNight(data.pricePerNight.toString());
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [propertyId, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!propertyId) {
      console.error('No property ID available for update');
      return;
    }

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description, location, pricePerNight: parseFloat(pricePerNight) }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error('Failed to update property:', response.statusText);
        return;
      }

      router.push('/profile');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  if (!property) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Edit Property</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="pricePerNight" className="block text-lg font-medium text-gray-700 mb-2">Price per Night</label>
            <input
              type="number"
              id="pricePerNight"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPropertyPage;
