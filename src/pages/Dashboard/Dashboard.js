import "./Dashboard.scss";
import CurrentCurrency from "../../components/CurrentCurrency/CurrentCurrency";
import CurrencyConversion from "../../components/CurrencyConversion/CurrencyConversion";
import { Link } from "react-router-dom";
import LoginIcon from "../../assets/icons/pencil_12702283.svg";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Link className="dashboard__link" to="/login">
        <img className="dashboard__login-icon" src={LoginIcon} alt="Login" />
      </Link>
      <p className="dashboard__login-text">Login</p>
      <h2 className="dashboard__title">Welcome to London</h2>
      <CurrentCurrency />
      <CurrencyConversion />
    </main>
  );
}
