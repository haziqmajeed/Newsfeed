import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

const NewsFeedDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // safety check (important for refresh case)
  if (!state?.newsItem) {
    return <p>No data available</p>;
  }

  const {
    title,
    description,
    content,
    urlToImage,
    publishedAt,
    source,
    url
  } = state.newsItem;

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h1 className="details-title">{title}</h1>

      <img
        src={urlToImage}
        alt={title}
        className="details-image"
      />

      <div className="meta-info">
        <span><strong>Source:</strong> {source?.name}</span>
        <span><strong>Published:</strong> {publishedAt}</span>
      </div>

      <p className="details-description">{description}</p>
      <p className="details-content">{content}</p>
    </div>

  );
};

export default NewsFeedDetails;
