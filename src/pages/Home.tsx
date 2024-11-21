import React, { useEffect, useState } from "react";
import { countryList } from "../assets/countryList"; // Update this with the actual path to the countryList file

const base_URL: string = "https://v6.exchangerate-api.com/v6/fb122cb72688b7a9eb54dc17/pair/";

const Home: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<string>("ENTER TO GET EXCHANGE VALUE");
  const [flags, setFlags] = useState<{ [key: string]: string }>({});

  // Initialize flag URLs
  useEffect(() => {
    const initializeFlags = () => {
      const updatedFlags: { [key: string]: string } = {};
      (Object.keys(countryList) as Array<keyof typeof countryList>).forEach((code) => {
        updatedFlags[code] = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
      });
      setFlags(updatedFlags);
    };
    initializeFlags();
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }
    const newUrl = `${base_URL}${fromCurrency}/${toCurrency}`;
    try {
      const response = await fetch(newUrl);
      const data = await response.json();
      if (data && data.conversion_rate) {
        const conversionRate: number = data.conversion_rate;
        setResult(`${amount} ${fromCurrency} = ${(conversionRate * amount).toFixed(2)} ${toCurrency}`);
      } else {
        setResult("Error fetching conversion rate.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data.");
    }
  };

  return (
    <div>
      <div className="container">
        <h2>CURRENCY CONVERTER</h2>

        <div id="amount">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount || ""}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="dropdown">
          <div className="from dfc">
            <p>FROM</p>
            <div className="df">
              <img src={flags[fromCurrency]} alt={`${fromCurrency} Flag`} />
              <select
                className="select1"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {Object.keys(countryList).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="icon">↔️</div>

          <div className="to dfc">
            <p>TO</p>
            <div className="df">
              <img src={flags[toCurrency]} alt={`${toCurrency} Flag`} />
              <select
                className="select2"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {Object.keys(countryList).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="cont2">
          <p className="msg">{result}</p>
          <button className="btn" onClick={handleConvert}>
            GET EXCHANGE RATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
