"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Booking = {
  id: string;
  createdAt: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  userId: string;
  propertyId: string;
};

function BookingDetailPage() {
  const { query } = useRouter();
  const { id } = query;
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/bookings/${id}`)
        .then((res) => res.json())
        .then((data) => setBooking(data));
    }
  }, [id]);

  if (!booking) return <div>Loading...</div>;

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Total Price: {booking.totalPrice}</p>
    </div>
  );
}

export default BookingDetailPage;
