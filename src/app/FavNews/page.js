'use client'
import React,{useEffect,useState} from 'react'
import NewsCard from '@/Components/NewsCard';
import { useRouter } from 'next/router';
const Page = () => {
    const  userId  = localStorage.getItem("userId");
    const [favNews, setFavNews] = useState([]);
    /// Get userId from the URL
    useEffect(() => {
        if (userId) {
          fetchFavNews();
        }
      }, [userId]);
      const fetchFavNews = async () => {
        try {
          const response = await fetch(`http://localhost:8080/news/${userId}/favNews`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch favorite news');
          }
          const data = await response.json();
          console.log(data);
          setFavNews(data);

        } catch (error) {
          setError(error.message);
          console.error('Error fetching favorite news:', error);
        }
      };
  return (
    <div style={{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap"
    }}>
      {
        favNews.map((e)=>{
            return <NewsCard article={e}></NewsCard>
        })
      }
    </div>
  )
}

export default Page
