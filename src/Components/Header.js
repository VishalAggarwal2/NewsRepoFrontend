'use client'
// components/Header.js
import React, { useState,useEffect } from 'react';
import { useClient } from 'next/client'; // Import useClient
import Link from 'next/link';
import { redirect } from 'next/navigation'
import styles from './Header.module.css';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve userId from localStorage when component mounts
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, [userId]);

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    console.log("called");
    router.push(`/News/${searchQuery}`);
    e.preventDefault();

  };



return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/News">NewsBoy</Link>
      </div>

{userId?<><nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/News/tech">Tech</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/News/entertainment">Entertainment</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/News/education">Education</Link>
          </li>
          <li className={styles.navItem}>
            <Link href={`/FavNews`}>Saved News</Link>
          </li>
        </ul>
      </nav>
      <form style={{display:"flex",flexDirection:"row",gap:"20px"}} onSubmit={handleSearch}>
        <input style={{
          border:"solid",
          borderRadius:"10px",
          padding:"5px",
          borderColor:"black",
          color:"red"
        }}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search news"
          className={styles.searchInput}
        />
        <button style={{border:"solid",borderRadius:"5px", background:"white",color:"#0070f3", padding:"5px"}} type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

<button onClick={()=>{localStorage.removeItem("userId")
  window.location.reload();
  window.location.href = "/login";
}}>Logout</button>
      </>  :   <ul className={styles.navList}>
          <li className={styles.navItem}>
       <Link href="/login">Login</Link>
          </li>
          <li className={styles.navItem}>
            <Link href={`/signup`}>SignUp</Link>
          </li>
        </ul>}
    </header>
  );
};

export default Header;
