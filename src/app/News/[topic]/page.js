"use client"
import { useParams } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import NewsCard from '@/Components/NewsCard';
import axios from 'axios';

const page = () => {
  const [news,Setnews]= useState([]);

const router = useParams();
const {topic}=router;
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("--------------------News----------------");
        const response = await axios.get(`http://localhost:8080/news/${topic}`);
        console.log(response.data);
        Setnews(response.data);
      } catch (error) {
        console.error("Error fetching the news:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once


  return (
    <div style={{
      display:"flex",
      flexDirection:"row",
      flexWrap:"wrap"
  }}>
    {
      news.map((e)=>{
          return <NewsCard article={e}></NewsCard>
      })
    }
  </div>
  )
}

export default page
