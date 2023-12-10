import "./CurrentCurrency.scss";
import { useEffect, useState } from "react";
import { fetchCurrentCurrency } from "../../utils/API";
import PoundIcon from "../../assets/icons/pound-sterling_2505594.svg";

export default function CurrentCurrency() {
  const [poundCurrency, setPoundCurrency] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentGBP = async () => {
      try {
        const data = await fetchCurrentCurrency();
        setPoundCurrency(data.data.GBP);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentGBP();
  }, []);

  const formattedPoundCurrency = isLoading
    ? "Loading..."
    : `£ ${parseFloat(poundCurrency).toFixed(4)}`;

  return (
    <article className="current-currency">
      <div className="current-currency__box">
        <img
          className="current-currency__pound-icon"
          src={PoundIcon}
          alt="Pound icon"
        />
        <div>
          {isLoading ? (
            <p className="current-currency__text">Loading...</p>
          ) : (
            <p className="current-currency__text">
              <b className="current-currency__text">Current GBP</b> : £{" "}
              {formattedPoundCurrency}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
