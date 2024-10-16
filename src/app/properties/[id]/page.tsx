"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Property = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  pricePerNight?: number;
  available?: boolean;
};

function PropertyDetailPage() {
  const { query } = useRouter();
  const { id } = query;
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/properties/${id}`)
        .then((res) => res.json())
        .then((data) => setProperty(data));
    }
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h1>{property.name}</h1>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyDetailPage;
