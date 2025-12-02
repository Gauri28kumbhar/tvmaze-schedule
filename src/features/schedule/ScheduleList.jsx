import ScheduleCard from "./ScheduleCard";

function ScheduleList({ items }) {
  return (
    <div className="schedule-grid">
      {items.map((item) => (
        <ScheduleCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ScheduleList;