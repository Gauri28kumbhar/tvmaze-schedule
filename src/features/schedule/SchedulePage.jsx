// import { useEffect, useState, useMemo } from "react";
// import { fetchSchedule } from "../../lib/tvmazeApi";
// import Loader from "../../components/Loader";
// import ErrorMessage from "../../components/ErrorMessage";
// import ScheduleList from "./ScheduleList";

// function SchedulePage() {
//   const [schedule, setSchedule] = useState([]);
//   const [status, setStatus] = useState("loading");
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [genre, setGenre] = useState("");

//   useEffect(() => {
//     async function load() {
//       try {
//         const data = await fetchSchedule("US");
//         setSchedule(data);
//         setStatus("success");
//       } catch (err) {
//         setError(err.message);
//         setStatus("error");
//       }
//     }
//     load();
//   }, []);

//   const genres = useMemo(() => {
//     const set = new Set();
//     schedule.forEach((item) => {
//       item.show.genres.forEach((g) => set.add(g));
//     });
//     return Array.from(set);
//   }, [schedule]);

//   const filtered = schedule.filter((item) => {
//     const nameMatch = item.show.name.toLowerCase().includes(search.toLowerCase());
//     const genreMatch = !genre || item.show.genres.includes(genre);
//     return nameMatch && genreMatch;
//   });

//   if (status === "loading") return <Loader label="Fetching US TV schedule..." />;
//   if (status === "error") return <ErrorMessage message={error} />;

//   return (
//     <div className="page">
//       <div className="schedule-header">
//         <h1 className="schedule-title">US TV Schedule – Today</h1>
//         <p className="schedule-subtitle">Shows airing today in the United States</p>

//         <div className="schedule-actions">
//           <input
//             className="input-text"
//             placeholder="Search show…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             className="select-input"
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//           >
//             <option value="">All genres</option>
//             {genres.map((g) => (
//               <option key={g}>{g}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <ScheduleList items={filtered} />
//     </div>
//   );
// }

// export default SchedulePage;

import { useEffect, useState, useMemo } from "react";
import { fetchSchedule } from "../../lib/tvmazeApi";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import ScheduleList from "./ScheduleList";

function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [showTop10, setShowTop10] = useState(false);   // ⭐ NEW

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSchedule("US");
        setSchedule(data);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    }
    load();
  }, []);

  // Extract unique genres
  const genres = useMemo(() => {
    const set = new Set();
    schedule.forEach((item) => {
      item.show.genres.forEach((g) => set.add(g));
    });
    return Array.from(set);
  }, [schedule]);

  // ⭐ Base filtered results (search + genre)
  const baseFiltered = schedule.filter((item) => {
    const nameMatch = item.show.name.toLowerCase().includes(search.toLowerCase());
    const genreMatch = !genre || item.show.genres.includes(genre);
    return nameMatch && genreMatch;
  });

  // ⭐ Top 10 logic
  const filtered = useMemo(() => {
    if (!showTop10) return baseFiltered;

    // Sort by rating (descending)
    const sorted = [...baseFiltered].sort((a, b) => {
      const r1 = a.show.rating?.average || 0;
      const r2 = b.show.rating?.average || 0;
      return r2 - r1;
    });

    return sorted.slice(0, 10);
  }, [baseFiltered, showTop10]);

  if (status === "loading") return <Loader label="Fetching US TV schedule..." />;
  if (status === "error") return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <div className="schedule-header">
        <h1 className="schedule-title">US TV Schedule – Today</h1>
        <p className="schedule-subtitle">
          Shows airing today in the United States
        </p>

        {/* Search + Genre */}
        <div className="schedule-actions">
          <input
            className="input-text"
            placeholder="Search show…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select-input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {/* ⭐ TOP 10 BUTTON */}
          <button
            className="top10-btn"
            onClick={() => setShowTop10(!showTop10)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid var(--accent)",
              background: showTop10 ? "var(--accent)" : "transparent",
              color: showTop10 ? "#fff" : "var(--text)",
              cursor: "pointer",
              transition: "0.2s"
            }}
          >
            {showTop10 ? "Show All" : "Top 10 Shows"}
          </button>
        </div>
      </div>

      <ScheduleList items={filtered} />
    </div>
  );
}

export default SchedulePage;
