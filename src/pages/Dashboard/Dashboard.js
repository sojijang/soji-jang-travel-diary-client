import "./Dashboard.scss";
import CurrentCurrency from "../../components/CurrentCurrency/CurrentCurrency";
import CurrencyConversion from "../../components/CurrencyConversion/CurrencyConversion";

export default function Dashboard() {
  return (
    <main>
      <CurrentCurrency />
      <CurrencyConversion />
    </main>
  );
}
