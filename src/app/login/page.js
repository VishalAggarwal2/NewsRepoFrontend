'use client';

import React, { useState } from 'react';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // State for handling errors

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
 
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      if (data && data.id) { // Ensure data contains an 'id' property
        localStorage.setItem("userId", data.id);
        console.log('Login successful:', data);
        alert("Login successful ......");
        window.location.reload();
        window.location.href = "/News";
      } else {
        throw new Error('Invalid response data');
      }
  
      console.log('Login successful:', data);
      router.push("/News")
      // Handle successful login (e.g., redirect to another page or show a success message)
    } catch (error) {
      console.error('Error during login:', error);
      setError("Invalid Credintial");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
        style={{color:"black"}}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
        style={{
            color:"black"
        }}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Page;
