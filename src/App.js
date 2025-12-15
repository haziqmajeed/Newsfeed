import { Routes, Route } from "react-router-dom";
import NewsFeed from "./Page/NewsFeed";
import NewsFeedDetails from "./Page/NewsFeedDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsFeed />} />
      <Route path="/news-details" element={<NewsFeedDetails />} />
    </Routes>
  );
}

export default App;
