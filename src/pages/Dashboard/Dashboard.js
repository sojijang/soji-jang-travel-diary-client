import "./Dashboard.scss";
import CurrentCurrency from "../../components/CurrentCurrency/CurrentCurrency";
import CurrencyConversion from "../../components/CurrencyConversion/CurrencyConversion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <button className="dashboard__login-button">
        <Link className="dashboard__link" to="/login">
          Login
        </Link>
      </button>
      <CurrentCurrency />
      <CurrencyConversion />
    </main>
  );
}
