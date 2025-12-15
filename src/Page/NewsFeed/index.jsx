import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import ImageComponent from "../../Components/ImageViewer";
const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const pullDistance = useRef(0);
  const isDragging = useRef(false);

  const REFRESH_THRESHOLD = 80;


  const fetchNews = async () => {

    setIsRefreshing(true);
      

      try {
        const res = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=7036b09db7e64f24891a22c6e5ab54b9"
        );

        const filteredNews = res.data.articles.filter(
          item => item.title
        );

        setNews(filteredNews);
      } catch (error) {
        console.error("Error fetching news", error);
      } finally {
        setIsRefreshing(false);
      }
    };

  useEffect(() => {
    fetchNews();
  }, []);


  const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0) {
        pullDistance.current = e.touches[0].clientY - startY.current;
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance.current > 80) {
        fetchNews(); // 🔁 refresh
      }
      pullDistance.current = 0;
    };

    const handleMouseDown = (e) => {
    if (window.scrollY === 0) {
      isDragging.current = true;
      startY.current = e.clientY;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    pullDistance.current = e.clientY - startY.current;
  };

  const handleMouseUp = () => {
    if (isDragging.current && pullDistance.current > REFRESH_THRESHOLD) {
      fetchNews();
    }
    isDragging.current = false;
    pullDistance.current = 0;
  };

   const filteredBySearch = news.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="news-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >

      <div className="refresh-indicator">
        {isRefreshing ? "Refreshing..." : "Pull down to refresh"}
      </div>
  <h1 className="page-title">News Feed</h1>

  {/* 🔎 Search Bar */}
  <input
    type="text"
    placeholder="Search by URL..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-input"
  />

  {/* News List */}
  <div className="news-list">
    {filteredBySearch.map((item, index) => (
      <Link
        key={index}
        to="/news-details"
        state={{ newsItem: item }}
        className="news-link"
      >
        <div className="news-card">
          <ImageComponent
            src={item.urlToImage}
            alt={item.title}
          />
          <div className="news-content">
            <h3 className="news-title">{item.title}</h3>
          </div>
        </div>
      </Link>
    ))}
  </div>

  {filteredBySearch.length === 0 && (
    <p className="no-results">No results found</p>
  )}
</div>

  );
};

export default NewsFeed;
