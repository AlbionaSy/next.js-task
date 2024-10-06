// app/bookings/[id]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './BookingDetails.module.css'; // Import CSS Module for styles

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function BookingDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const bookings = await getBookings();

    // Ensure bookings is an array
    if (!Array.isArray(bookings)) {
      throw new Error('Invalid response format');
    }

    // Find the booking by ID
    const booking = bookings.find((b) => b.id.toString() === id); // Convert b.id to string for comparison

    // If the booking is not found, return a 404 page
    if (!booking) {
      return notFound();
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Booking Details</h1>
        <p className={styles.details}>
          This booking is with <strong>{booking.doctor_name}</strong> for <strong>{booking.service}</strong> and it ends at <strong>{booking.end_time}</strong>.
        </p>
        <Link href="/" className={styles.backLink}>Back to Home</Link>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Error</h1>
        <p className={styles.error}>{error.message}</p>
        <Link href="/" className={styles.backLink}>Back to Home</Link>
      </div>
    );
  }
}
