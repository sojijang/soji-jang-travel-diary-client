import "./CurrencyConversion.scss";
import { useEffect, useState } from "react";
import { fetchCurrentCurrency } from "../../utils/API";
import ConvertIcon from "../../assets/icons/money_10189352.svg";
import IntoIcon from "../../assets/icons/equal_402583.svg";

export default function CurrencyConversion() {
  const [allCurrencyCodes, setAllCurrencyCodes] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [selectedToCurrency, setSelectedToCurrency] = useState();

  const [exchangeRate, setExchangeRate] = useState();
  const [rate, setRate] = useState(1);
  const [convertedRate, setConvertedRate] = useState(true);

  let toRate, fromRate;
  if (convertedRate) {
    fromRate = rate;
    toRate = rate * exchangeRate;
  } else {
    fromRate = rate / exchangeRate;
    toRate = rate;
  }

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const data = await fetchCurrentCurrency();

        const currencyCodes = Object.keys(data.data);
        const PoundCurrency = Object.keys(data.data)[9];
        const DollarCurrency = Object.keys(data.data)[31];

        setAllCurrencyCodes(currencyCodes);
        setFromCurrency(DollarCurrency);
        setSelectedToCurrency(PoundCurrency);

        setExchangeRate(data.data[PoundCurrency]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrency();
  }, []);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        if (fromCurrency != null && selectedToCurrency != null) {
          const data = await fetchCurrentCurrency();

          if (fromCurrency === "USD") {
            setExchangeRate(data.data[selectedToCurrency]);
          } else {
            const baseExchangeRate = data.data[fromCurrency];
            const targetExchangeRate = data.data[selectedToCurrency];
            const exchangeRate = targetExchangeRate / baseExchangeRate;
            setExchangeRate(exchangeRate);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrency();
  }, [fromCurrency, selectedToCurrency]);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleFromRateChange = (event) => {
    setRate(event.target.value);
    setConvertedRate(true);
  };

  const handleToRateChange = (event) => {
    setRate(event.target.value);
    setConvertedRate(false);
  };

  return (
    <div className="conversion">
      <div className="conversion__wrapper">
        <img
          className="conversion__icon"
          src={ConvertIcon}
          alt="Convert icon"
        />
        <div className="conversion__container">
          <div className="conversion__dollar">
            <input
              className="conversion__input"
              type="number"
              value={isNaN(fromRate) ? "" : fromRate}
              onChange={handleFromRateChange}
            />
            <select
              className="conversion__select"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              {allCurrencyCodes.map((code) => (
                <option key={code} className="conversion__option" value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
          <img
            className="conversion__into-icon"
            src={IntoIcon}
            alt="Into icon"
          />
          <div className="conversion__pound">
            <input
              className="conversion__input"
              type="number"
              value={isNaN(toRate) ? "" : toRate}
              onChange={handleToRateChange}
            />
            <select
              className="conversion__select"
              value={selectedToCurrency}
              onChange={(event) => setSelectedToCurrency(event.target.value)}
            >
              {allCurrencyCodes.map((code) => (
                <option key={code} className="conversion__option" value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
