import { Link } from "react-router-dom";

function ScheduleCard({ item }) {
  const { show, airtime, airdate } = item;
  const image = show.image?.medium;

  return (
    <article className="schedule-card">
      <div className="schedule-card-img">
        <img src={image} alt={show.name} />
        <div className="schedule-card-badge">
          {airdate} · {airtime || "TBA"}
        </div>
      </div>

      <div className="schedule-card-body">
        <h3 className="schedule-card-title">{show.name}</h3>

        <div className="schedule-card-genres">
          {show.genres.slice(0, 3).map((g) => (
            <span className="genre-pill" key={g}>
              {g}
            </span>
          ))}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Link to={`/show/${show.id}`}>
            <button className="btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ScheduleCard;