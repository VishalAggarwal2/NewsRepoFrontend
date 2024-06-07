"use client"
import NewsCard from '@/Components/NewsCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [news,Setnews]= useState([]);
  useEffect(() => {
    const fetchData = async () => {

      try {
        console.log("--------------------News----------------");
        const response = await axios.get("http://localhost:8080/news");
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
  );
};

export default Page;
