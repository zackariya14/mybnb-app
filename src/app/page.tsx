"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

type Property = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  location: string;
  imageUrls: string[];
};

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      const response = await fetch("/api/properties?limit=3");
      const data = await response.json();
      setProperties(data.slice(0, 3));
    }
    fetchProperties();
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">

      <section className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/023/308/330/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white p-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold drop-shadow-md mb-4">Welcome to MyBnB</h1>
          <p className="text-lg font-light drop-shadow-md mb-8">
            Discover unique homes and experiences. Find your perfect stay with ease on our reliable rental platform.
          </p>
          <Link href="/properties">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
              Explore All Properties
            </button>
          </Link>
        </div>
      </section>

      <section className="p-10 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Featured Properties</h2>
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
                <h3 className="text-2xl font-semibold text-gray-800">{property.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{property.description || "No description available."}</p>
                <p className="text-gray-800 font-medium mt-4">Location: <span className="text-gray-700">{property.location}</span></p>
                <p className="text-gray-800 font-medium mt-2">Price per Night: <span className="text-green-600 font-bold">${property.pricePerNight}</span></p>
                <Link href={`/properties/${property.id}`}>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/properties">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition">
              Show More Properties
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
