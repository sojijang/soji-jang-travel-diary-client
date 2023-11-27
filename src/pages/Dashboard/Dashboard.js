import "./Dashboard.scss";
import CurrentCurrency from "../../components/CurrentCurrency/CurrentCurrency";
import CurrencyConversion from "../../components/CurrencyConversion/CurrencyConversion";
import BookingInformation from "../../components/BookingInformation/BookingInformation";
import EnglandIcon from "../../assets/icons/great-britain_6608472.svg";
import BackIcon from "../../assets/icons/left-arrow_9590004.svg";

export default function Dashboard({ currentUser }) {
  return (
    <main className="dashboard">
      <div className="dashboard__wrapper">
        <img
          className="dashboard__image"
          src={EnglandIcon}
          alt="England Icon"
        />
        <h2 className="dashboard__title">Welcome to England</h2>
      </div>
      <CurrentCurrency />
      <CurrencyConversion />
      <BookingInformation currentUser={currentUser} />
      <img className="dashboard__image dashboard__image--back" src={BackIcon} alt="Back icon" />
    </main>
  );
}
