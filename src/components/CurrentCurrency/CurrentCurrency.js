import "./CurrentCurrency.scss";
import { useEffect, useState } from "react";
import { fetchCurrentCurrency } from "../../utils/API";

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
      <h1>Current Currency</h1>
      <div className="current-currency__box">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Current Currency (GBP): {poundCurrency}</p>
        )}
      </div>
    </article>
  );
}
