"use client";

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";


type Property = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  pricePerNight?: number;
  available?: boolean;
  imageUrls: string[];
};

function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div className="relative h-64">
              <Slider {...sliderSettings}>
                {property.imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center justify-center h-64">
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{property.description || "No description available."}</p>
              <p className="text-gray-800 font-medium mt-4">Location: <span className="text-gray-700">{property.location}</span></p>
              <p className="text-gray-800 font-medium mt-2">Price per Night: <span className="text-green-600 font-bold">${property.pricePerNight}</span></p>
              <div className="mt-4">
              <Link href={`/properties/${property.id}`} passHref>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertiesPage;
