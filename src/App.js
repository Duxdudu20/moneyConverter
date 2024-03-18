import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(3);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [convert, SetConvert] = useState("");
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        SetIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        SetConvert(data.rates[toCur]);
        console.log(data);

        SetIsLoading(false);
      }
      if (fromCur === toCur) return SetConvert(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {convert}
        {toCur}
      </p>
    </div>
  );
}
