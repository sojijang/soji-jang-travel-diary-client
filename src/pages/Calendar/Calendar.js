import "./Calendar.scss";
import CalendarFeature from "../../components/CalendarFeature/CalendarFeature";

export default function Calendar({ currentUser }) {
  return (
    <main className="calendar">
      <CalendarFeature currentUser={currentUser} />
    </main>
  );
}
