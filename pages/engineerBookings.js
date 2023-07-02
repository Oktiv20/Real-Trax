/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import BookingCard from '../components/BookingCard';
import { getEngineerBooking } from '../api/projectData';
import { getUser } from '../api/userData';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  const getBookingInfo = () => {
    getUser(user.uid).then((currentUser) => {
      if (currentUser.isEngineer) {
        getEngineerBooking(currentUser.firebaseKey).then(setBookings);
      }
    });
  };

  useEffect(() => {
    getBookingInfo();
  }, [user]);

  return (
    <div className="text-center my-4 text-white">
      <h1>MY BOOKINGS</h1>
      <hr style={{ color: 'white', borderWidth: '3px', opacity: '0.5' }} />
      <div className="d-flex flex-wrap">
        {bookings.map((booking) => (
          <BookingCard key={booking.firebaseKey} projectObj={booking} onUpdate={getEngineerBooking} />
        ))}
      </div>
    </div>
  );
}
