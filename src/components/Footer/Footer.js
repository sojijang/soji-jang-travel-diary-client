import "./Footer.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CalendarIcon from "../../assets/icons/deadline_674292.svg";
import MapIcon from "../../assets/icons/map_7145349.svg";

export default function Footer() {
  const location = useLocation();
  const hideFooterForPaths = ["/", "/login", "/signup", "/dashboard"];

  if (hideFooterForPaths.includes(location.pathname)) {
    return <></>;
  }

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Link className="footer__link" to="/calendar">
          <img
            className="footer__calendar-icon"
            src={CalendarIcon}
            alt="Calendar"
          />
        </Link>
        <Link className="footer__link" to="/map">
          <img className="footer__map-icon" src={MapIcon} alt="Map" />
        </Link>
      </div>
    </footer>
  );
}
