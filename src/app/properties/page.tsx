"use client";

import { useEffect, useState } from 'react';

type Property = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  pricePerNight?: number;
  available?: boolean;
};

function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PropertiesPage;
