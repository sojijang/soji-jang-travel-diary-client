import "./Dashboard.scss";
import CurrentCurrency from "../../components/CurrentCurrency/CurrentCurrency";
import CurrencyConversion from "../../components/CurrencyConversion/CurrencyConversion";

export default function Dashboard() {
  return (
    <main>
      <CurrentCurrency />
      <h1>Convert</h1>
      <CurrencyConversion />
      <div className="equal">=</div>
      <CurrencyConversion />
    </main>
  );
}
