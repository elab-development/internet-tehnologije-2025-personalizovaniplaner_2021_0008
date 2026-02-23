import React, { useEffect, useState } from 'react';

const ExchangeRate = () => {
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/RSD');
        if (!response.ok) throw new Error('Failed to fetch exchange rate');
        const data = await response.json();
        setRate(data.rates.EUR);
        setError(null);
      } catch (err) {
        setError('Unable to load exchange rate');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return (
    <div className="admin-section mt-4">
      <h3>Exchange Rate</h3>
      {error ? (
        <p className="text-warning">{error}</p>
      ) : loading ? (
        <p>Loading exchange rate...</p>
      ) : (
        <div className="d-flex gap-3 align-items-center">
          <div className="p-3 border rounded">
            <strong>1 RSD</strong> = <strong>{rate?.toFixed(4)} EUR</strong>
          </div>
          <div className="p-3 border rounded">
            <strong>1 EUR</strong> = <strong>{(1 / rate)?.toFixed(2)} RSD</strong>
          </div>
        </div>
      )}
      <p className="text-muted mt-2 small">Data from ExchangeRate-API.com</p>
    </div>
  );
};

export default ExchangeRate;
