"use client";
// components/NewsCard.js
import React, { useEffect, useState } from "react";
import styles from "./NewsCard.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const NewsCard = ({ article }) => {

  const [urlcontains, setUrl] = useState(false);
  useEffect(() => {
    const currentUrl = window.location.href;
    console.log(currentUrl);
    const contains = currentUrl.includes("FavNews");
    setUrl(contains);
  });

  const [newsdata, setNewsData] = useState({});

  const addFavNews = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log(article.author);

      const newsData = {
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
        sourcename: article.source ? article.source.name : "Unknown",
      };
      console.log(newsData);
      console.log(userId);

      const response = await fetch(
        `http://localhost:8080/news/${userId}/addFav`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the correct content type
          },
          body: JSON.stringify(newsData), // Convert data to JSON string
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save news");
      }
      alert("Favorite news Added successfully");
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };



  
  const deleteFavNews = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/news/${userId}/${article.newsId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete news");
      }

      // Handle success response
      console.log("Favorite news deleted successfully");
alert("Favorite news deleted successfully");
window.location.reload();

    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className={styles.card}>
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className={styles.image}
        />
      ) : (
        <></>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.description}>{article.description}</p>
        <p className={styles.contentText}>{article.content}</p>
        <p className={styles.author}>By: {article.author || "Unknown"}</p>
        <p className={styles.date}>
          Published at: {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        {article.source ? (
          <p className={styles.source}>
            Source: {article.source.name || "Unknown"}
          </p>
        ) : (
          <></>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "3rem",
          }}
        >
          <a
            href={article.url}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>

          {urlcontains && (
            <button onClick={deleteFavNews} className={styles.link}>
              Delete
            </button>
          )}

          {!urlcontains && (
            <button onClick={addFavNews} className={styles.link}>
              Save News
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
