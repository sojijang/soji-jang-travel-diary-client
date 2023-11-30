import "./Dashboard.scss";
import { Link } from "react-router-dom";
import CurrentCurrency from "../../components/CurrentCurrency/CurrentCurrency";
import CurrencyConversion from "../../components/CurrencyConversion/CurrencyConversion";
import BookingInformation from "../../components/BookingInformation/BookingInformation";
import EnglandIcon from "../../assets/icons/great-britain_6608472.svg";
import BackIcon from "../../assets/icons/left-arrow_9590004.svg";
import CalendarIcon from "../../assets/icons/deadline_674292.svg";
import MapIcon from "../../assets/icons/map_7145349.svg";

export default function Dashboard({ currentUser }) {
  return (
    <main className="dashboard">
      <div className="dashboard__wrapper">
        <img
          className="dashboard__image"
          src={EnglandIcon}
          alt="England Icon"
        />
        <h2 className="dashboard__title">Welcome to UK</h2>
      </div>
      <div className="dashboard__container">
        <div className="dashboard__group">
          <CurrentCurrency />
          <CurrencyConversion />
        </div>
        <BookingInformation currentUser={currentUser} />
      </div>
      <Link className="dashboard__link" to="/">
        <img
          className="dashboard__image--back"
          src={BackIcon}
          alt="Back icon"
        />
      </Link>
      <article className="footer footer-dashboard">
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
      </article>
    </main>
  );
}
