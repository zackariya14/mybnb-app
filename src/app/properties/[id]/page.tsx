'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Property = {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  imageUrls: string[];
};

function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/properties/${id}`)
        .then((res) => res.json())
        .then((data) => setProperty(data));
    }
  }, [id]);

  if (!property) return <div>Loading...</div>;

  const calculateTotalPrice = (checkIn: Date, checkOut: Date) => {
    const days = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
    return days * property.pricePerNight;
  };

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      alert('Vänligen välj både inchecknings- och utcheckningsdatum.');
      return;
    }

    const totalPrice = calculateTotalPrice(checkInDate, checkOutDate);
    setTotalPrice(totalPrice);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property.id,
          checkInDate,
          checkOutDate,
          totalPrice,
        }),
      });

      if (response.ok) {
        alert('Bokning skapad!');
      } else {
        const errorData = await response.json();
        alert(`Bokning misslyckades: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Något gick fel med bokningen. Försök igen senare.');
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  function PrevArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none z-10"
        aria-label="Föregående bild"
      >
        ‹
      </button>
    );
  }

  function NextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none z-10"
        aria-label="Nästa bild"
      >
        ›
      </button>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">{property.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="w-full h-full overflow-hidden rounded-lg shadow-lg flex items-center justify-center relative">
          <Slider {...sliderSettings} className="w-full h-full">
            {property.imageUrls.map((url, index) => (
              <div key={index} className="w-full h-full flex items-center justify-center bg-gray-100">
                <img
                  src={url}
                  alt={`Property Image ${index + 1}`}
                  className="object-cover w-full h-full rounded"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between max-h-[500px] overflow-y-auto">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Beskrivning</h2>
            <p className="text-gray-700 mb-4">{property.description}</p>
            <p className="text-lg text-gray-900 font-semibold mb-4">Plats: {property.location}</p>
            <p className="text-xl font-bold text-green-700 mb-6">Pris per natt: ${property.pricePerNight}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Välj ett datum för bokning</h3>
            <div className="flex space-x-4">
              <DatePicker
                selected={checkInDate}
                onChange={(date: Date | null) => setCheckInDate(date ?? undefined)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                placeholderText="Incheckningsdatum"
                className="w-full px-4 py-2 mt-2 text-lg border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
              <DatePicker
                selected={checkOutDate}
                onChange={(date: Date | null) => {
                  setCheckOutDate(date ?? undefined);
                  if (checkInDate && date) setTotalPrice(calculateTotalPrice(checkInDate, date));
                }}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate || new Date()}
                placeholderText="Utcheckningsdatum"
                className="w-full px-4 py-2 mt-2 text-lg border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
            {totalPrice && (
              <div className="mt-4 text-lg font-semibold text-gray-700">
                Totalpris för vistelsen: ${totalPrice}
              </div>
            )}
            <button
              onClick={handleBooking}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Boka nu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailPage;
