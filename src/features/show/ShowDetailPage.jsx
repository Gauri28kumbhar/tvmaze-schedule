import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchShowById } from "../../lib/tvmazeApi";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

function ShowDetailPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchShowById(id);
        setShow(data);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    }
    load();
  }, [id]);

  if (status === "loading") return <Loader label="Loading show info..." />;
  if (status === "error") return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to Schedule
      </Link>

      <div className="show-detail-layout">
        {show.image?.original && (
          <img className="show-poster" src={show.image.original} alt={show.name} />
        )}

        <div>
          <h1>{show.name}</h1>

          <div
            className="show-summary"
            dangerouslySetInnerHTML={{ __html: show.summary }}
          ></div>

          <p style={{ marginTop: "0.5rem",  opacity: 0.8 }}>
            ⭐<strong> Rating: </strong>{show.rating?.average || "N/A"}
          </p>

           <p style={{ marginTop: "1rem",  opacity: 0.8 }}><strong>Language:</strong> {show.language}</p>
         
           <p style={{ marginTop: "1rem",  opacity: 0.8 }}>
            <strong>Premiered:</strong> {show.premiered}
           </p>
        </div>
      </div>
    </div>
  );
}

export default ShowDetailPage;