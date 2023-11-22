import "./CountrySelection.scss";
import CountrySelect from "../../components/CountrySelect/CountrySelect";

export default function CountrySelection() {
  return (
    <main className="first-page">
      <h1 className="first-page__title">Where are you going?</h1>
      <CountrySelect />
    </main>
  );
}
