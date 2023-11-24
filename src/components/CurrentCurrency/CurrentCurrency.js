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

  return (
    <article className="current-currency">
      {/* <h2 className="current-currency__title">Current Currency</h2> */}
      <div className="current-currency__box">
        <img className="current-currency__pound-icon" src={PoundIcon} alt="" />
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>
              <b>Current GBP</b> : £ {poundCurrency}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
