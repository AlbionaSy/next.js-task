// app/page.tsx

import Link from "next/link";
import React from "react";
import styles from './Home.module.css'; // Import CSS Module for styles

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Bookings</h1>
      <Link href="/bookings" className={styles.createBookingButton}>
        Create a New Booking
      </Link>
      <ul className={styles.bookingList}>
        {bookings.map((booking) => (
          <li key={booking.id} className={styles.bookingItem}>
            <Link href={`/booking/${booking.id}`} className={styles.bookingLink}>
              A Booking on {booking.date} starting at {booking.start_time}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
