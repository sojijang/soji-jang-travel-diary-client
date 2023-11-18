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
    <article>
      <div className="current-currency">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Current Currency (GBP): {poundCurrency}</p>
        )}
      </div>
    </article>
  );
}
