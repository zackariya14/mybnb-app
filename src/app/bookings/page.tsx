"use client";

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

function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>{booking.totalPrice}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookingsPage;
