// app/bookings/page.tsx

'use client'; // This line ensures the component can manage state and handle events

import React from 'react';
import Link from 'next/link';
import styles from './BookingForm.module.css'; // Import CSS Module for styles

const BookingForm: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Create a FormData object to collect form inputs
    const formData = new FormData(e.currentTarget);
    
    // Extract values from FormData
    const service = formData.get('service') as string;
    const doctorName = formData.get('doctor_name') as string;
    const startTime = formData.get('start_time') as string;
    const endTime = formData.get('end_time') as string;
    const date = formData.get('date') as string;

    // Validate inputs
    if (!service || !doctorName || !startTime || !endTime || !date) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://host.docker.internal:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          doctor_name: doctorName,
          start_time: startTime,
          end_time: endTime,
          date,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create booking: ${errorText}`);
      }

      const data = await response.text(); // Read response text
      alert(data); // Show success message

      // Optionally, reset the form fields
      (e.target as HTMLFormElement).reset(); // Reset the form fields
    } catch (error) {
      alert(error.message); // Show error message
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date:</label>
          <input className={styles.input} type="date" name="date" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Start Time:</label>
          <input className={styles.input} type="time" name="start_time" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Doctor Name:</label>
          <input className={styles.input} type="text" name="doctor_name" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Service:</label>
          <input className={styles.input} type="text" name="service" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>End Time:</label>
          <input className={styles.input} type="time" name="end_time" required />
        </div>
        <button type="submit" className={styles.submitButton}>Create Booking</button>
      </form>
      <Link href="/" className={styles.backLink}>Back to Home</Link>
    </div>
  );
};

export default BookingForm;
