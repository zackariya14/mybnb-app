"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateProperty = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    pricePerNight: '',
    images: [] as File[],
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      console.error('User is not logged in or has no valid ID');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('location', formData.location);
    form.append('pricePerNight', formData.pricePerNight);
    formData.images.forEach((image) => {
      form.append('images', image);
    });
    form.append('ownerId', session.user.id);

    const response = await fetch('/api/properties', {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      setSuccessMessage('Property successfully created!');
      setTimeout(() => {
        router.push('/');
      }, 2000); 
    } else {
      console.error('Failed to create property');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">Create a New Property</h2>
        
        {successMessage && (
          <div className="bg-green-100 text-green-700 border border-green-400 rounded-lg p-4 mb-4 text-center font-semibold">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Property name"
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description"
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Location"
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Price per Night</label>
            <input
              type="number"
              value={formData.pricePerNight}
              onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
              placeholder="Price per night"
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              Create Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProperty;
