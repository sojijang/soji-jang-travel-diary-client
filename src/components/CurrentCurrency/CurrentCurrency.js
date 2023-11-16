import "./CurrentCurrency.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CurrentCurrency() {
  const [poundCurrency, setPoundCurrency] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentCurrency = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/currency-rate"
        );

        console.log(response.data.data.GBP);
        setPoundCurrency(response.data.data.GBP);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentCurrency();
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
