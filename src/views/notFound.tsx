import { useNavigate } from "react-router-dom";
import { NOTFOUNDIMG } from "../constant";
import "../styles/views/notFound.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main className="container">
      <div className="content">
        <div className="title">Oops!</div>
        <div className="subtitle">
          The page you're looking for doesn't exist.
        </div>
        <p onClick={() => navigate("/")} className="btn">
          Go back
        </p>
      </div>
      <div className="image-container">
        <LazyLoadImage
          src={NOTFOUNDIMG}
          alt="404 Not Found"
          className="image"
          loading="lazy"
        />
      </div>
    </main>
  );
}
