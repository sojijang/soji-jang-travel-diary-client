import "./Dashboard.scss";
import CurrentCurrency from "../../components/CurrentCurrency/CurrentCurrency";
import CurrencyConversion from "../../components/CurrencyConversion/CurrencyConversion";
import BookingInformation from "../../components/BookingInformation/BookingInformation";
import EnglandIcon from "../../assets/icons/great-britain_6608472.svg";

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
    </main>
  );
}
